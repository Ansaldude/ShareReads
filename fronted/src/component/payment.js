import React, { useState } from 'react';
import axios from 'axios';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartId, amount } = location.state || {};

    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');

    const validateCardName = (name) => /^[a-zA-Z\s]+$/.test(name);

    const validateCardNumber = (number) => /^\d{16}$/.test(number);

    const validateExpiryDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!regex.test(date)) return false;

        const [month, year] = date.split('/').map(Number);
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        return year > currentYear || (year === currentYear && month >= currentMonth);
    };

    const validateCVV = (cvv) => /^\d{3}$/.test(cvv);

    const handlePayment = () => {
        if (!cartId || !amount || !cardName || !cardNumber || !expiryDate || !cvv) {
            setError('All payment details are required');
            return;
        }

        if (!validateCardName(cardName)) {
            setError('Invalid cardholder name');
            return;
        }

        if (!validateCardNumber(cardNumber)) {
            setError('Card number must be 16 digits');
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            setError('Invalid expiry date');
            return;
        }

        if (!validateCVV(cvv)) {
            setError('CVV must be 3 digits');
            return;
        }

        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/payment', {
            cartId,
            amount,
            paymentMethod: 'Credit Card',
            cardName,
            cardNumber,
            expiryDate,
            cvv
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            return axios.delete('http://localhost:3000/cart/clear', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        })
        .then(() => {
            setPaymentStatus('Payment successful');
            navigate('/payment-success', { state: { amount } });
        })
        .catch(error => {
            console.error('Error response data:', error.response?.data);
            setPaymentStatus('Payment failed');
            setError(error.response?.data || 'Error processing payment');
        });
    };

    return (
        <div>
            <Nav />
            <Header />
            <div className="paymentbox">
                <div className="payment-box">
                    <img src="../img/card.png" alt="Card Image" className="image-1" />
                    <h2>Continue Payment</h2>
                    {error && <div className="error">{error}</div>}
                    <table className="payment-table">
                        <tbody>
                            <tr>
                                <td>
                                    <label>Cardholder's Name:</label>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={cardName}
                                        placeholder='Joe Harris'
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Card Number:</label>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={cardNumber}
                                        placeholder='1234 1234 1234 1234'
                                        onChange={(e) => setCardNumber(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Expiry Date (MM/YY):</label>
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={expiryDate}
                                        placeholder='MM/YY'
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>CVV:</label>
                                </td>
                                <td>
                                    <input 
                                        type="password" 
                                        value={cvv}
                                        placeholder='***'
                                        onChange={(e) => setCvv(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <p className="payamount">Total Amount: Rs. {amount}</p>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <button className="pay-button" onClick={handlePayment}>Pay Now</button>
                    {paymentStatus && <div className="payment-status">{paymentStatus}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
