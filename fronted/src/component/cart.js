import React, { Component } from 'react';
import axios from 'axios';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';
import { Navigate } from 'react-router-dom';


class Cart extends Component {
    constructor() {
        super();
        this.state = {
            cart: [],
            error: '',
            totalAmount: 0,
            redirectToPayment: false,
            cartId: ''  // Add cartId to state
        };
    }

    componentDidMount() {
        this.fetchCart();
    }

    fetchCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ error: 'User not logged in' });
            return;
        }

        axios.get('http://localhost:3000/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.items) {
                const totalAmount = response.data.items.reduce((total, item) => total + (item.book.price * item.quantity), 0);
                this.setState({ 
                    cart: response.data.items, 
                    totalAmount,
                    cartId: response.data.cartId // Set cartId from response
                });
            } else {
                this.setState({ error: 'Cart is empty or response is malformed' });
            }
        })
        .catch(error => {
            this.setState({ error: 'Error fetching cart' });
        });
    };

    handleRemove = (bookId) => {
        const token = localStorage.getItem('token');
        axios.delete('http://localhost:3000/cart', {
            headers: { 'Authorization': `Bearer ${token}` },
            data: { bookId }
        })
        .then(response => {
            this.fetchCart();
        })
        .catch(error => {
            console.error('Error removing book from cart:', error);
        });
    };

    handleQuantityChange = (bookId, quantity) => {
        const token = localStorage.getItem('token');
        axios.put('http://localhost:3000/cart/quantity', { bookId, quantity }, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            this.fetchCart();
        })
        .catch(error => {
            console.error('Error updating quantity:', error);
        });
    };

    handleProceedToPayment = () => {
        this.setState({ redirectToPayment: true });
    };

    render() {
        if (this.state.redirectToPayment) {
            return <Navigate to="/payment" state={{ cartId: this.state.cartId, amount: this.state.totalAmount }} />;
        }

        return (
            <div className='cartbox'>
                <Nav />
                <Header />
                <div className="cart-box">
                    <h2>Cart</h2>
                    {this.state.error && <div className="error">{this.state.error}</div>}
                    {this.state.cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <table className="cart-table">
                            <thead>
                                <tr>
                                
                                    <th>Book </th>
                                
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className="cart-item-image">
                                            {item.book && item.book.image ? (
                                                <img src={`http://localhost:3000/uploads/${item.book.image}`} alt={item.book.book} />
                                            ) : 'No Image'}
                                       
                                      {item.book ? item.book.book : 'No book info'}</td>
                                        <td>Rs. {item.book ? item.book.price : 'N/A'}</td>
                                        <td>
                                            <button className='btnquantity' onClick={() => this.handleQuantityChange(item.book._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                            {item.quantity}
                                            <button className='btnquantity' onClick={() => this.handleQuantityChange(item.book._id, item.quantity + 1)}>+</button>
                                        </td>
                                        <td>
                                            <button className='btnremove' onClick={() => this.handleRemove(item.book._id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4"><p  className="cart-total-label">Total Amount: Rs. {this.state.totalAmount}</p>
                                    </td>
                                   
                                </tr>
                                <tr>
                                    <td colSpan="5">
                                        <button className="pay-button1" onClick={this.handleProceedToPayment}>Proceed to Payment</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Cart;
