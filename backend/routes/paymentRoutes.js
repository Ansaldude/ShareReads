const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const auth = require('../middleware/auth');

router.post('/payment', auth, paymentController.processPayment);
router.get('/paymentdetails', auth, paymentController.getPaymentsByUserId);


router.get('/payments/:id', auth, paymentController.getPaymentById);

module.exports = router;
