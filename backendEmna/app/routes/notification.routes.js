const express = require('express');
const router = express.Router();
const notifController = require('../controllers/notification.controller');

// Routes for Tests
router.post('/', notifController.store);
router.get('/', notifController.all);



module.exports = router;