// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact
router.post('/contact', contactController.createContact);

module.exports = router;
