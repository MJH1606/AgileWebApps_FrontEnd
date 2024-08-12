const express = require('express');
const router = express.Router();
const controller = require('../controllers/tools');
router.get('', controller.getAll);
module.exports = router;