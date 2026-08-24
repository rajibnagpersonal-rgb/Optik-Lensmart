const express = require('express');
const router = express.Router();
const { getPageContent, updatePageContent } = require('../controllers/contentController');

router.get('/:page', getPageContent);
router.post('/:page', updatePageContent);

module.exports = router;
