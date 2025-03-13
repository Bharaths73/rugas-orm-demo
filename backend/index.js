
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connect=require('./config/database');
const customerRoutes=require('./routes/customerRoute');
const productRoutes=require('./routes/productRoute');
const orderRoutes=require('./routes/orderRoute');
const authRoutes=require('./routes/authRoute');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connect();

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/products', productRoutes);
// app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/auth', authRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`);
})


