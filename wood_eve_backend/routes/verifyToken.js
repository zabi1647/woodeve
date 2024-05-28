const jwt = require('jsonwebtoken');

const verify = (req,res,next)=>{
    const authHeader = req.headers.token;

    if(authHeader){
        jwt.verify(authHeader, process.env.JWT_SECRET, (err,user)=>{
            if(err){
                return res.status(403).json('Token is not valid');
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json('You are not authenticated');}
};

const verifyTokenAndAuthorization = (req,res,next)=>{
    verify(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
           res.status(403).json("your are not allowed to login");
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verify(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
           res.status(403).json("your are not allowed to login");
        }
    })
}

module.exports = {verify, verifyTokenAndAuthorization, verifyTokenAndAdmin};