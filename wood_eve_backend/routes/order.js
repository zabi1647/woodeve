const router = require('express').Router();
const Order = require('../models/order');
const { create } = require('../models/users');
const {verify, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// create Order
router .post('/create', verify,async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

// this is update Order


router.put('/:id', verifyTokenAndAdmin, async(req,res)=>{
   
   try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new:true});
    res.status(200).json(updatedOrder);
   } catch (error) {
        res.status(500).json(error);
   }
});


// // // delete 


router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted")
    } catch (error) {
        res.status(500).json(error);
        
    }
});


// // // get user Order

router.get("/find/:userid",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const Orders = await Order.find({userId:req.params.userid});

        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



// // // get all  

router.get("/all",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const Orders = await Order.find();
        

        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error);
        
    }
});

// get monthly income

router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previosMonth = new Date(date.setMonth(lastMonth.getMonth()-1));
    
    try {
        const income = await Order.aggregate([
            {$match:{
                createdAt:{$gte:previosMonth},
            }},
            {$project:{
                month:{$month:"$createdAt"},
                sales:"$amount",
            }},
            {$group:{
                _id:"$month",
                total:{$sum:"$sales"},
            }}
        ]);


        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
        
    }
});



module.exports = router

