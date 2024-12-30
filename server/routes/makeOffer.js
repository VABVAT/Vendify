require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const { productModel } = require("../models/productModel");
const { offerModel } = require("../models/offerModel");
const mongoose = require("mongoose");
const { userModel } = require("../models/userModel");

router.use(cors());
mongoose.connect(process.env.MONGO_KEY);

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const sellerEmail = req.body.sellerEmail;
    const price = req.body.price;
    const productId = req.body.id;
    if(email === sellerEmail) return res.status(400).json({error: "Cannot send offer to yourself"})
    if (!email || !price || !productId || !sellerEmail)
      return res.status(400).json({ error: "incorrect format" });
    const user = await userModel.findOne({
      userName: email,
    });
    if (!user) return res.status(400).json({ error: "not logged in" });
    const productOffer = await offerModel.findOne({
      offeredBy: email,
      objectId: productId,
      marked: false
    });
    if (productOffer)
      return res.status(400).json({ error: "You have already made an offer, wait until the owner responds" });
    else {
      const product = await productModel.findOne({
        _id: productId,
      });
      if(!product) return res.status(400).json({error: "incorrect product Id"})
      if(product.sold === true) return res.status(400).json({error: "product sold alreadt"})
      const newOffer = new offerModel({
        offeredBy: email,
        offeredTo: sellerEmail,
        price: price,
        objectId: productId,
        marked: false,
        accepted: false,
        image: product.image,
        name: product.name,
        description: product.description,
        originalPrice: product.price,
        status: "PENDING",
        originalSeller: sellerEmail
      });
      await newOffer.save();
      return res.status(200).json({ success: "offer created" });
    }
  } catch (e) {
    return res.status(500).json({ error: "internal server error" });
  }
});

module.exports = {
  makeOffer: router,
};
