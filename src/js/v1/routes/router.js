const express = require('express');
const controller = require('../../controller/controller');

const router = express.Router();

// POST print
router.post('/print', controller.postPrint);

module.exports = router;