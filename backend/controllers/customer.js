const Customer=require('../models/customerSchema')

exports.createCustomer=async(req,res)=>{
    try {
        const {name,address,phone,email}=req.body;

        if(!name || !address || !phone || !email){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        const customerEmail=await Customer.findOne({email:email})

        if(customerEmail){
            return res.status(400).json({
                success:false,
                message:"Customer email already exists"
            })
        }

        const newCustomer=await Customer.create({
            name,
            address,
            phone,
            email
        })
        return res.status(200).json({
            success:true,
            message:"Customer is created successfully",
            customer:newCustomer
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllCustomers=async(req,res)=>{
    try {
        const customers=await Customer.find({}).sort({name:1}).select("name email phone address")
        return res.status(200).json({
            success:true,
            customers:customers
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}