const express = require('express');
const router = express.Router();
const controller = require('../controllers/employees');

//router.post('/delete', controller.deleting);

router.get('', controller.getAll);
/*
router.get('/addPage', controller.addPage);

router.post('/add', controller.create);

router.post('/edit', controller.update);

router.post('/getById', controller.getById);
*/
module.exports = router;