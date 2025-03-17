const Customer = require("../models/customerSchema");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

exports.dashboardDetails=async(req,res)=>{
    try {
        const orders=await Order.find();
        const no_of_customers=await Customer.countDocuments();
        const no_of_products=await Product.countDocuments();
        const no_of_orders_delivered = await Order.countDocuments({ status: 'delivered' });
        const no_of_orders=orders.length;

        const dashboardDetails={
            no_of_products,
            no_of_customers,
            no_of_orders,
            no_of_orders_delivered,
            orders
        }
        
        return res.status(200).json({
            success: true,
            dashboardDetails:dashboardDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}