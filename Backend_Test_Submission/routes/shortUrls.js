const express = require('express');
const router = express.Router();
const controller = require('../controllers/shortUrlController');

router.post('/', controller.createShortUrl);
router.get('/:code', controller.redirect);
router.get('/stats/:code', controller.getStats);

module.exports = router;
