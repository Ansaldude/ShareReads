import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';
const UserBooks = () => {
    const { userId } = useParams();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/books/user/${userId}`)
                .then(response => {
                    setBooks(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError('Error fetching books');
                    setLoading(false);
                });
        } else {
            setError('User ID is required');
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
                <Nav />
                <Header />
                <div className='mybook'>
            <h2>My Books</h2>
            {error && <div className="error">{error}</div>}
            {books.length === 0 && !error && <p>No books found</p>}
            <div className="book-list">
                {books.map((book, index) => (
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
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
            </div>
        </div>
    );
}

export default UserBooks;
