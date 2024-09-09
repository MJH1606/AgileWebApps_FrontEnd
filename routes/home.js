const express = require('express');
const router = express.Router();
const controller = require('../controllers/home');

router.get('', controller.showHome);

module.exports = router;