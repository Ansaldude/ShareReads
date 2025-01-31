import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './headeradmin';
import Header2 from './header2';

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/paymentdetails', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setPayments(response.data);
            } catch (err) {
                setError('Failed to load payments');
                console.error('Error fetching payments:', err.response ? err.response.data : err.message);
            }
        };

        fetchPayments();
    }, []);

    return (
        <div>
            <Header2 />
            <Header />
            <div className="content-wrapper1">
                <section id="candidates" className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 bg-white padding-2">
                                <h3 className="box-title">Payment Details</h3>
                                {error && <div className="error">{error}</div>}
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Payment ID</th>
                                            <th>Cart ID</th>
                                            <th>Amount</th>
                                            <th>Payment Method</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment, index) => (
                                            <tr key={index}>
                                                <td>{payment._id}</td>
                                                <td>{payment.cartId}</td>
                                                <td>{payment.amount}</td>
                                                <td>{payment.paymentMethod}</td>
                                                <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminPayments;
