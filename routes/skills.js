const express = require('express');
const router = express.Router();
const controller = require('../controllers/skills');

router.get('', controller.getAll);

router.post('/delete', controller.deleting);
router.post('/getByName', controller.getByName);
/*
router.post('/edit', controller.update);



router.get('/addPage', controller.addPage);

router.post('/add', controller.create);
*/
module.exports = router;