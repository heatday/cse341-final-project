const express = require('express');
const router = express.Router();
const safecheck = require('../middleware/authorization.js');
const controller = require('../controllers/plant');

router.get('/', controller.getAll);
router.get('/:plantId', controller.getOne);

router.post('/', safecheck.authorize, controller.uploadPlant);

router.put('/:plantId', safecheck.authorize, controller.updatePlant);

router.delete('/:plantId', safecheck.authorize, controller.deletePlant);

module.exports = router;