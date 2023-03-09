const express = require('express');
const router = express.Router();

const controller = require('../controllers/plant');

router.get('/', controller.getAll);
router.get('/:plantId', controller.getOne);

router.post('/', controller.uploadPlant);

router.put('/:plantId', controller.updatePlant);

router.delete('/:plantId', controller.deletePlant);

module.exports = router;