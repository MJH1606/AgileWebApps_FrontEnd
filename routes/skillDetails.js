const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillDetails');

router.post('/delete', controller.deleting);

router.post('/edit', controller.update);

router.post('/addPage', controller.addPage);

router.post('/add', controller.create);

router.post('/getById', controller.getById);

router.post('', controller.getAll);

module.exports = router;