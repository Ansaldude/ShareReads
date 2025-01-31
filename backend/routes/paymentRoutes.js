// const express = require('express');
// const router = express.Router();
// const paymentController = require('../controllers/paymentController');
// const auth = require('../middleware/auth');

// router.post('/payment', auth, paymentController.processPayment);
// router.get('/paymentdetails', auth, paymentController.getPaymentsByUserId);


// router.get('/payments/:id', auth, paymentController.getPaymentById);

// module.exports = router;

//===================================================================================

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');
const checkRole = require("../middleware/checkRole");

router.post('/payment', auth, checkRole("buyer"), paymentController.processPayment);
router.get('/paymentdetails', auth, checkRole("buyer"), paymentController.getPaymentsByUserId);
router.get('/payments/:id', auth, checkRole("buyer"), paymentController.getPaymentById);

module.exports = router;
