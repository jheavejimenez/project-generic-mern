const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); //helping to connet in mongodb

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/users.route');
const productRouter = require('./routes/product.route');
const genericRouter = require('./routes/generic.route');

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/generics', genericRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
