const router = require('express').Router();
const Cart = require('../models/cart');
const { create } = require('../models/users');
const {verify, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// create cart
router .post('/create', verify,async(req,res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

// this is update cart


router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>{
   
   try {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true});
    res.status(200).json(updatedCart);
   } catch (error) {
        res.status(500).json(error);
   }
});


// // // delete 


router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted")
    } catch (error) {
        res.status(500).json(error);
        
    }
});


// // // get user Cart

router.get("/find/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const cart = await Cart.find({userId:req.params.userid});

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



// // // get all  

router.get("/all",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const Carts = await Cart.find();


        res.status(200).json(Carts);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



module.exports = router

