function emailAuthenticator(req, res, next){
    const email = req.body.email;
    // console.log(req.body)
    if(!email) res.status(400).json({error : "Email not provided"})
    else{
        const arr = email.split('@');
        if(arr[arr.length-1] !== "iitgoa.ac.in") res.status(400).json({error: "Enter institute email"})
        else next();
    }
}
module.exports = emailAuthenticator;