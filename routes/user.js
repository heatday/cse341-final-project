const express = require('express');
const router = express.Router();

const controller = require('../controllers/user');

router.get('/', controller.getLoggedInUser);
router.get('/:username', controller.getPublicUser);

router.post('/', controller.createUser);

router.put('/', controller.updateUser);

router.delete('/', controller.deleteUser);

module.exports = router;