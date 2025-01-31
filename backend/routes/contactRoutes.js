// // routes/contactRoutes.js

// const express = require('express');
// const router = express.Router();
// const contactController = require('../controllers/contactController');

// // POST /api/contact
// router.post('/contact', contactController.createContact);

// module.exports = router;

//======================================================================================

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

router.post('/contact', auth, checkRole("buyer"), contactController.createContact);

module.exports = router;
