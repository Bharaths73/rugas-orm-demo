const Product=require('../models/productSchema')
const Order=require('../models/orderSchema')
const Customer=require('../models/customerSchema')
const mongoose=require('mongoose')

exports.createOrder=async(req,res)=>{
    const { customer, product, quantity, status } = req.body;

  try {
    const customerExists=await Customer.findById(new mongoose.Types.ObjectId(customer));
    if(!customerExists){
        return res.status(404).json({
            success:false,
            message:"Customer not found"
        })
    }

    const productExists = await Product.findById(new mongoose.Types.ObjectId(product));

    if (!productExists) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
    });
    }

    const validStatuses = Order.schema.path('status').enumValues;

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success:false,
        message: 'Invalid status' 
      });
    }

    if (productExists.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient product quantity' });
    }

    const newOrder = new Order({ customerId:customer, productId:product, quantity, status });
    await newOrder.save();

    productExists.quantity -= quantity;
    await productExists.save();

    return res.status(200).json({
        success: true,
        message: 'Order created successfully',
        order: newOrder
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message:error.message
    });
  }
}

exports.getAllOrders=async(req,res)=>{
    const {sortOrder='status'}=req.query
  try {
    const orders = await Order.find().populate('customerId').populate('productId').sort({[sortOrder]:1}).select("customerId productId quantity status")

    return res.status(200).json({
        success: true,
        orders: orders
    });
  } catch (err) {
    return res.status(500).json({
        success: false,
        message: err.message
    });
  }
}


exports.updateOrderStatus=async(req,res)=>{

}