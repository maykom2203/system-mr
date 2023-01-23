const express = require('express');
const loginRouter = require('./auth.router');


const routers = express.Router();
routers.use('/login', loginRouter);


module.exports = routers;