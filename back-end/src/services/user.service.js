const { User } = require('../database/models');
const { validateUser } = require('./auth.service');

const createUser = async ({ name, email, password }) => {
const { error, token } = await validateUser({ name, email, password });

  if (error) { return { message: error }; } 
    User.create({ name, email, password });
  return { token };
};

const getUser = async () => User.findAll(
  { attributes: {
    exclude: ['password'],
  } },
);

const getUserById = async (userId) => User.findAll({ 
  where: { id: userId }, attributes: { exclude: ['password'] } });

module.exports = {
  createUser,
  getUserById,
  getUser,
};