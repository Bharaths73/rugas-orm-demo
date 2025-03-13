const Product=require('../models/productSchema')

exports.createProduct=async (req,res)=>{
    try {
        const {name,price,description,category,stock}=req.body;
        const {image}=req.files;
        if(!image){
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
        const newProduct=await Product.create({
            name,
            price,
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
        const products=await Product.find({}).sort({category:1})
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