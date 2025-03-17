const User = require("../models/userSchema");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signUp=async(req,res)=>{
    try {
       const {name:username,email,password}=req.body;

       if(!username || !email || !password){
           return res.status(400).json({
                 success:false,
                 message:"Please fill all the fields"
           })
       }

       const user=await User.findOne({email:email});

       if(user){
          return res.status(400).json({
                success:false,
                message:"User already exists"
          })
       }

       const hashedPassword=await bcrypt.hash(password,10);

       const newUser=await User.create({
           username,
           email,
           password:hashedPassword
       })
       return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user:newUser
    })
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        const user=await User.findOne({email:email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        if(!await bcrypt.compare(password,user.password)){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }

        const payload={
            email:user.email,
            id:user._id
        }

        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        user.token=token;
        user.password=undefined;
        
        const options={
            expires:new Date(Date.now()+1*24*60*60*1000),
            httpOnly:true
        }

        res.cookie('token',token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User logged in successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.logout=async(req,res)=>{
    try {
        req.user.token=undefined;
        // await req.user.save();

        res.clearCookie('token', {
            httpOnly: true,
          });

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}