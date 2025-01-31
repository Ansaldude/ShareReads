import React from 'react';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const { amount } = location.state || {}; 

    return (
        <div>
            <Nav />
            <Header />
            <div className="success-box">
                <div className="sucessbox">
                <img src="../img/tick.png" className="tick" />
                    <h2>Payment Successful</h2>
                    <p>Thank you for your payment. Your order has been processed.</p>
                    <div className='pay-text'>
                    <p>Total Amount: Rs. {amount}</p> 
                    <p>Payment Method: Credit Card</p>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;
