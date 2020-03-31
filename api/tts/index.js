const express = require('express');
const router = express.Router();
const ctrl = require('./tts.ctrl');

router.get('/', ctrl.voice);

module.exports = router;