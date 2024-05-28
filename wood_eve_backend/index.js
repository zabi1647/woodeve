const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Connected to MongoDB')).catch(err=>console.error('Could not connect to MongoDB', err));
app.get('/api/v1', (req, res) => {
    
})

app.use(cors());

app.use(express.json());    

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order',orderRoute);
app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});