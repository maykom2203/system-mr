const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const productsRouter = require('./products.router');

const routers = express.Router();
routers.use('/login', authRouter);
routers.use('/register', userRouter);
routers.use('/customer/products', productsRouter);

module.exports = routers;