const express = require('express');
const loginController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', loginController.login);
router.put('/', loginController.login);

module.exports = router;