const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['placed', 'shipped', 'delivered', 'cancelled'], default: 'placed' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Order', orderSchema);