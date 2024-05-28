const router = require('express').Router();
const Product = require('../models/product');
const { create } = require('../models/users');
const {verify, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// create 
router .post('/', verifyTokenAndAdmin,async(req,res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update
router.put('/:id', verifyTokenAndAdmin, async(req,res)=>{
   
   try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true});
    res.status(200).json(updatedProduct);
   } catch (error) {
        res.status(500).json(error);
   }
});


// // delete 


router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted")
    } catch (error) {
        res.status(500).json(error);
        
    }
});


// // get product
router.get("/find/:id",async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



// // get all products 

router.get("/allproducts",async(req,res)=>{
    const qNew = req.query.new;
    const qCatagories = req.query.catagory;
    try {
        let products;
        if(qNew){
            products = await Product.find().sort({_id:-1}).limit(5);
        }else if(qCatagories){
            products = await Product.find({
                catagories:{
                    $in:[qCatagories],
                },
            });
        }else{
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



module.exports = router

