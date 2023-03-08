const express = require('express');
const router = express.Router();

const plantsController = require('../controller/plant');

router.get('/', plantsController.getAll);