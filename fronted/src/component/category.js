import React, { Component } from 'react';
import axios from 'axios';

import { Navigate } from 'react-router-dom';

class BookSearch extends Component {
    constructor() {
        super();
        this.state = {
            categories: ["Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Fantasy", "Biography"],
            selectedgenre: '',
            books: [],
            error: '',
            redirectToCart: false // State for handling redirection
        };
    }

    componentDidMount() {
        this.fetchAllBooks();
    }

    fetchAllBooks = () => {
        axios.get('http://localhost:3000/books')
            .then(response => {
                this.setState({ books: response.data });
            })
            .catch(error => {
                this.setState({ error: 'Error fetching books' });
            });
    };

    handlegenreChange = (e) => {
        this.setState({ selectedgenre: e.target.value }, () => {
            if (this.state.selectedgenre) {
                this.fetchBooksBygenre(this.state.selectedgenre);
            } else {
                this.fetchAllBooks();
            }
        });
    };

    fetchBooksBygenre = (genre) => {
        axios.get(`http://localhost:3000/books?genre=${genre}`)
            .then(response => {
                this.setState({ books: response.data });
            })
            .catch(error => {
                this.setState({ error: 'Error fetching books' });
            });
    };

    addToCart = (bookId) => {
        const token = localStorage.getItem('token');

        axios.post('http://localhost:3000/cart', { bookId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            // Set state to trigger redirection
            this.setState({ redirectToCart: true });
        })
        .catch(error => {
            console.error('Error adding book to cart:', error.response ? error.response.data : error.message);
            // Handle error (e.g., show an error message)
        });
    };

    render() {
        if (this.state.redirectToCart) {
            // Redirect to the cart page
            return <Navigate to="/cart" />;
        }

        return (
            <div>
            

                <div className='genre'>
                    <h2>Search Books by Genre</h2>
                    <select
                        className="form-control genreoption"
                        value={this.state.selectedgenre}
                        onChange={this.handlegenreChange}
                    >
                        <option value="">Select Genre</option>
                        {this.state.categories.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                    {this.state.error && <div className="error">{this.state.error}</div>}
                </div>
                <div className="book-list">
                    {this.state.books.length === 0 && !this.state.error && <p>No books found</p>}
                    {this.state.books.map((book, index) => (
                        <div key={index} className="book-item">
                            {book.image && (
                                <img
                                    src={`http://localhost:3000/uploads/${book.image}`}
                                    alt={book.book}
                                />
                            )}
                            <div className='itembox'>
                                <h3>{book.book}</h3>
                                <p>Author: {book.author}</p>
                                <p>Price: Rs.{book.price}</p>
                                <p>Genre: {book.genre}</p>
                                <button className='cart' onClick={() => this.addToCart(book._id)}>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
             
            </div>
        );
    }
}

export default BookSearch;
