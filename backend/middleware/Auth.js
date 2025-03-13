const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/userSchema')

exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token||req.body.token||req.header('Authorization').replace('Bearer ','')

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please login"
            })
        }

        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user=decode
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Your session is expired please login again"
            })
        }
        next();
    }
    catch{
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}

