const express = require('express');
const path = require('path');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const productsRouter = require('./products.router');

const routers = express.Router();
routers.use('/login', authRouter);
routers.use('/register', userRouter);
routers.use('/customer/products', productsRouter);
routers.use('/images', express.static(path.resolve('src/public')));

module.exports = routers;