const Product=require('../models/productSchema')
const Order=require('../models/orderSchema')
const Customer=require('../models/customerSchema')
const mongoose=require('mongoose')

exports.createOrder=async(req,res)=>{
    const { customer, product, quantity, status } = req.body;

  try {
    const customerExists=await Customer.findById(new mongoose.Types.ObjectId(customer._id));
    if(!customerExists){
        return res.status(404).json({
            success:false,
            message:"Customer not found"
        })
    }

    const productExists = await Product.findById(new mongoose.Types.ObjectId(product._id));

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

    productExists.stock -= quantity;
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

exports.updateOrder=async(req,res)=>{
  const { customer, product, quantity, status, _id:orderId } = req.body;
  
  try {
    const customerExists=await Customer.findById(new mongoose.Types.ObjectId(customer._id));
    if(!customerExists){
        return res.status(404).json({
            success:false,
            message:"Customer not found"
        })
    }

    const productExists = await Product.findById(new mongoose.Types.ObjectId(product._id));

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

    const existingOrder=await Order.findById(orderId);
    const existingQuantity = existingOrder.quantity || 0;

    const quantityDifference = quantity - existingQuantity;
    if (productExists.stock < quantityDifference) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient product stock'
      });
    }

    const updatedOrder=await Order.findByIdAndUpdate(orderId,{customerId:customer, productId:product, quantity, status:status},{new:true})

    if (quantityDifference > 0) {
      productExists.stock -= quantityDifference;
    } else if (quantityDifference < 0) {
      productExists.stock += Math.abs(quantityDifference);
    }

    await productExists.save();

    return res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        order: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message:error.message
    });
  }
}

exports.deleteOrder=async(req,res)=>{
    try {
            const {id}=req.params;
            
            if(!id){
                return res.status(400).json({
                    success:false,
                    message:"id is missing"
                })
            }
            const deletedOrder = await Order.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    
            if (!deletedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            if(deletedOrder.status !== 'delivered'){
                const productExists = await Product.findById(deletedOrder.productId);
                if (productExists) {
                    productExists.stock += deletedOrder.quantity;
                    await productExists.save();
                }
            }

            const orders=await Order.find().populate('customerId').populate('productId').sort({status:1}).select("customerId productId quantity status")
    
            return res.status(200).json({
                success:true,
                message:"Deleted order successfully",
                orders
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
}