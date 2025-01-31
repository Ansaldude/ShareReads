// AllBooks.jsx

import React from 'react';
import axios from 'axios';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';
import { Link } from 'react-router-dom';

class AllBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            error: null,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/books')
            .then(response => {
                this.setState({ books: response.data });
            })
            .catch(error => {
                this.setState({ error: 'Error fetching books' });
                console.error('Error fetching books:', error);
            });
    }

    render() {
        const { books, error } = this.state;

        return (
            <div className="full-page-container">
                <Nav />
                <Header />
                <div className="content-wrapper3">
                <section className="content-header d-flex align-items-center">
                    <div className="container-fluid d-flex align-items-center">
                        <div className="row d-flex justify-content-center align-items-center w-100">
                            <div className="col-md-12 book-detail-card">
                                <div className="book-detail-header">
                                      {error && <div className="alert alert-danger">{error}</div>}
                                 
                                    <ul>
                                        {books.map(book => (
                                            <li key={book._id}>
                                             {book.image && <img   src={`http://localhost:3000/${book.image}` }
                                        alt={book.book} className="book-image"/>}
                                                   <div className="book-info">
                                                <h3>{book.book}</h3>
                                                <p><strong>Author:</strong> {book.author}</p>
                                                <p><strong>Price:</strong> {book.price}</p>
                                                <p><strong>Delivery:</strong> {book.delivery}</p>
                                                <p><strong>Genre:</strong> {book.genre}</p>
                                                <p><strong>Rating:</strong> {book.rating}</p>
                                                <p><strong>Description:</strong> {book.description}</p>
                                              
                                                <Link to={`/book/${book._id}`}>View Details</Link>
                                           </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        );
    }
}

export default AllBooks;
