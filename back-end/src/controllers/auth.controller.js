const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = authService.validateBody(req.body);
  const result = authService.validateBody(req.body).error;
  if (result) {
    return res.status(400).json({ message: result });
  }

  const { token, message } = await authService.validateLogin({ email, password });

  if (message) {
    return res.status(400).json({ message });
  }

  res.status(200).json({ token });
};

module.exports = { login };