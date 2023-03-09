const express = require('express');
const router = express.Router();

router.use('/forum', require('./forum'));
router.use('/plants', require('./plant'));
router.use('/user', require('./user'));

module.exports = router;