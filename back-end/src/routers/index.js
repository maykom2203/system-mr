const express = require('express');
const authRouter = require('./auth.router');
const userRouter = require('./user.router');


const routers = express.Router();
routers.use('/login', authRouter);
routers.use('/register', userRouter);

module.exports = routers;