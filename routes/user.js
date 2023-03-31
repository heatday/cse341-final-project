const express = require('express');
const router = express.Router();
const safeCheck = require('../middleware/authorization.js');
const controller = require('../controllers/user');

router.get('/', safeCheck.authorize, controller.getLoggedInUser);
router.get('/:username', controller.getPublicUser);

router.post('/', controller.createUser);

router.put('/', safeCheck.authorize, controller.updateUser);

router.delete('/', safeCheck.authorize, controller.deleteUser);

module.exports = router;