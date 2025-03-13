const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Product', productSchema);