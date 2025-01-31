const Payment = require('../models/payment');
const axios = require('axios');

exports.processPayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cartId, amount, paymentMethod, cardNumber, expiryDate, cvv } = req.body;

        if (!cartId || !amount || !cardNumber || !expiryDate || !cvv) {
            return res.status(400).send('All payment details are required');
        }

        const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!expiryDateRegex.test(expiryDate)) {
            return res.status(400).send('Invalid expiry date format. Use MM/YY');
        }

        const payment = new Payment({
            userId,
            cartId,
            amount,
            paymentMethod,
            paymentStatus: 'Completed'
        });

        await payment.save();

        await axios.delete('http://localhost:3000/cart/clear', {
            headers: { 'Authorization': `Bearer ${req.headers.authorization.split(' ')[1]}` }
        });

        res.status(200).send('Payment processed successfully');
    } catch (err) {
        console.error('Error processing payment:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
};

exports.getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.user._id;
        const payments = await Payment.find({ userId });

        if (payments.length === 0) {
            return res.status(404).send('No payments found for this user');
        }

        res.status(200).json(payments);
    } catch (err) {
        console.error('Error fetching payment details:', err.message);
        res.status(500).send('Server error');
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).send('Payment not found');
        }

        res.status(200).json(payment);
    } catch (err) {
        console.error('Error fetching payment details:', err.message);
        res.status(500).send('Server error');
    }
};
