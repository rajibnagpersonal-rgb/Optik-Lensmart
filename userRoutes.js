const express = require('express');
const router = express.Router();
const { syncUserProfile, getUserProfile } = require('../controllers/userController');

router.post('/sync', syncUserProfile);
router.get('/profile', getUserProfile);

module.exports = router;
