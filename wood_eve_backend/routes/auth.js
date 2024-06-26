const router = require('express').Router();
const User = require('../models/users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


// register

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// for login

router.post("/login", async (req,res)=>{
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(401).json("Wrong credentials");
        }
        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials");
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {expiresIn: "3d"});
        const {password, ...others} = user._doc;

        return res.status(200).json({...others,accessToken});
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router

