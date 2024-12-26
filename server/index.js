const express = require('express');
const cors = require('cors');
const app = express();
const {sendOtp} = require('./routes/sendOtp')
const {verifyOtp} = require('./routes/verifyOtp');
const { As } = require('./routes/signUpAsBuyer');
const { signIn } = require('./routes/signInAsBuyer');
const { products } = require('./routes/showListings');
const {postListing} = require('./routes/postListing');
const {listing} = require('./routes/listing');
app.use(cors());
app.use(express.json({ limit: '4mb' }));  // Adjust the limit as per your needs
app.use(express.urlencoded({ limit: '4mb', extended: true }));
// ! otp end point -> will be modified

app.get('/', (req, res) => {
    res.json({status : "server is running"})
})

app.use('/sendOtp', sendOtp);
app.use('/verifyOtp', verifyOtp);
app.use('/signUp', As)
app.use('/signIn', signIn)
app.use('/listing', products)
app.use('/postListing', postListing)
app.use('/userListings', listing)

app.listen(3000);