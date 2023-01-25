const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');
// const md5 = require("md5");
const CryptoJS = require('crypto-js');

const { User } = require('../database/models');

const validateBody = (params) => {
  const {email, password} = params
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  
    const validate = schema.validate(params);
  
    if (validate.error) {
      const e = 'Some required fields are missing';
      return { error: e };
    } else {
      return validate.value
    }
    
  };

const validateLogin = async ( email, password ) => {
    const user = await User.findOne({ where: { email } });
    // const users = await User.findAll();
    // console.log(users)
    // const hash = md5(password);

    if (!user || user.password !== CryptoJS.MD5(password).toString()) {
      const message = 'Invalid fields';
      return  {message} ;
    }
    const { password: _, ...userWithoutPassword } = user.dataValues;
    const token = jwtUtil.createToken(userWithoutPassword);
    return token ;
  };

const validateUser = async (params) => {
  const schema = Joi.object({
    name: Joi.string().min(8).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const { message } = error;
    return { error: message };
  }
  const { email } = params;
  const duplicated = await User.findOne({ where: { email } });
  if (duplicated) {
    return { error: 'User already registered' };
  }
  const token = jwtUtil.createToken(params);
  return { token };
};

const validateCategory = async (params) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const { message } = error;
    return { error: message };
  }
  return { params };
};

module.exports = { 
  validateBody,
  validateLogin, 
  validateUser,
  validateCategory,
};