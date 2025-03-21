
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const connect=require('./config/database');
const customerRoutes=require('./routes/customerRoute');
const productRoutes=require('./routes/productRoute');
const orderRoutes=require('./routes/orderRoute');
const authRoutes=require('./routes/authRoute');
const path=require('path');
const dashboardDetails=require('./routes/dashboardRoute')

dotenv.config();
const app = express();

const allowedOrigins = [
    process.env.CLIENT_URL, 
    'http://localhost:5173', 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connect();

app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardDetails);

const PORT=process.env.PORT || 5000;
app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`);
})


