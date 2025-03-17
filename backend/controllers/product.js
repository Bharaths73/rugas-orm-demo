const path = require('path');
const Product=require('../models/productSchema')
const fs=require('fs');
const mongoose=require('mongoose')

exports.createProduct=async (req,res)=>{
    try {
        const {name,price,description,category,stock}=JSON.parse(req.body.productInfo);
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"Please upload an image"
            })
        }

        if(!name || !price || !description || !category || !stock){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const date=Date.now()
        let fileName=`uploads/products/${date}${req.file.originalname}`;
        fs.renameSync(req.file.path,fileName);
        const newProduct=await Product.create({
            name,
            price,
            image:fileName,
            description,
            category,
            stock
        })
        return res.status(200).json({
            success:true,
            message:"Product is created successfully",
            product:newProduct
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find({}).sort({category:1}).select("name description stock price category image")
        return res.status(200).json({
            success:true,
            products:products
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("id is ",id);
        
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id is missing"
            })
        }
        const deletedProduct = await Product.findByIdAndDelete(new mongoose.Types.ObjectId(id));

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const filePath = path.join(__dirname, '..', '..',deletedProduct.image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

        const products=await Product.find().sort({category:1}).select("name description stock price category image")

        return res.status(200).json({
            success:true,
            message:"Deleted product successfully",
            products
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.updateProduct=async (req,res)=>{
    try {      
        const {_id:id,name,price,description,category,stock}=JSON.parse(req.body.productInfo);

        if(!name ||!price ||!description ||!category ||!stock){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        
        const product=await Product.findById(id);
        console.log("file is ",req.file);
        

        let fileName;
        if(req.file){
            const date=Date.now()
            fileName=`uploads/products/${date}${req.file.originalname}`;
            fs.renameSync(req.file.path,fileName);
        };

        const updateData = {
            name: name,
            price: price,
            description: description,
            category: category,
            stock: stock,
          };
          
          if (req.file) {
            updateData.image = fileName;
          }

        const updatedProduct=await Product.findByIdAndUpdate(id,updateData)

        if(!updatedProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Product updated successfully",
            product:updatedProduct
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}