const Customer=require('../models/customerSchema')
const mongoose=require('mongoose')
const Order=require('../models/orderSchema')

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

exports.deleteCustomer=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log("id is ",id);
        
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id is missing"
            })
        }
        const customer=await Customer.findById(new mongoose.Types.ObjectId(id))
        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        await Order.deleteMany({ customerId: customer._id });
        const deletedCustomer = await Customer.findByIdAndDelete(new mongoose.Types.ObjectId(id));

        const customers=await Customer.find({}).sort({name:1}).select("name email phone address")

        return res.status(200).json({
            success:true,
            message:"Deleted customer successfully",
            customers
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.updateCustomer = async(req,res)=>{
    try {
        const {_id,name,email,address,phone}=req.body;
        console.log("update customer ",req.body);
        
        if(!name || !address || !phone || !email){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }

        const customer=await Customer.findByIdAndUpdate(_id, {name,email,address,phone}, {new: true});
        if(!customer){
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Customer updated successfully",
            customer
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}