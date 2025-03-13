const mongoose=require('mongoose');
require('dotenv').config();

// Database Connection
const database = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));
}


module.exports=database;