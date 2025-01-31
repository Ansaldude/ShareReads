import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';

function BookDetails() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3000/books/${bookId}`)
            .then(response => setBook(response.data))
            .catch(error => {
                console.error('Error fetching book details:', error); // Log detailed error
                setError('Error fetching book details');
            });
    }, [bookId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Nav />
            <Header />
            <div className="book-details">
                <h2>{book.book}</h2>
                <img src={`http://localhost:3000/${book.image}`} alt={book.book} />
                <p>Author: {book.author}</p>
                <p>Price: Rs.{book.price}</p>
                <p>Genre: {book.genre}</p>
                <p>Description: {book.description}</p>
                <button onClick={() => navigate(-1)}>
                    Back to Search
                </button>
            </div>
            <Footer />
        </div>
    );
}

export default BookDetails;
