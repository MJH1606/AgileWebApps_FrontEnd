const express = require('express');
const router = express.Router();
const controller = require('../controllers/skillCategory');

router.get('', controller.getAll);

router.post('/delete', controller.deleting);
/*
router.post('/edit', controller.update);

router.post('/getById', controller.getById);

router.get('/addPage', controller.addPage);

router.post('/add', controller.create);
*/
module.exports = router;