const Product=require('../models/productSchema')
const Order=require('../models/orderSchema')
const Customer=require('../models/customerSchema')

exports.createOrder=async(req,res)=>{
    const { customerId, productId, quantity, status } = req.body;

  try {
    const customer=await Customer.findById(customerId);
    if(!customer){
        return res.status(404).json({
            success:false,
            message:"Customer not found"
        })
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
    });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient product quantity' });
    }

    const newOrder = new Order({ customerId, productId, quantity, status });
    await newOrder.save();

    product.quantity -= quantity;
    await product.save();

    res.status(200).json({
        success: true,
        message: 'Order created successfully',
        order: newOrder
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message:error.message
    });
  }
}

exports.getAllOrders=async(req,res)=>{
  try {
    const orders = await Order.find().populate('customerId').populate('productId');
    res.status(200).json({
        success: true,
        orders: orders
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        message: err.message
    });
  }
}


exports.updateOrderStatus=async(req,res)=>{}