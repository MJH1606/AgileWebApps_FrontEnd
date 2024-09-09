const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');

router.get('', controller.showLogin);
router.post('/login', controller.login);
router.get('/getUserInfo', controller.getUserInfo);

module.exports = router;