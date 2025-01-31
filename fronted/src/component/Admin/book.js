import React from 'react';
import axios from 'axios';


import  Header from './headeradmin';
import Header2 from './header2';
class BookList extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        axios.get('http://localhost:3000/books', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            this.setState({ books: response.data });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        });
    }

    render() {
        return (
            <div>
                    <Header2 />
                   <Header />
               
                <div className="content-wrapper1">
                    <section id="candidates" className="content-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 bg-white padding-2">
                                    <h3 className="box-title">All Books</h3>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Book Name</th>
                                                <th>Author</th>
                                                <th>Price</th>
                                                <th>Delivery</th>
                                                <th>Genre</th>
                                                <th>Rating</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.books.map((book, index) => (
                                                <tr key={index}>
                                                    <td><img src={`http://localhost:3000/${book.image}`} alt={book.book} width="50" height="70" /></td>
                                                    <td>{book.book}</td>
                                                    <td>{book.author}</td>
                                                    <td>{book.price}</td>
                                                    <td>{book.delivery}</td>
                                                    <td>{book.genre}</td>
                                                    <td>{book.rating}</td>
                                                    <td>{book.description}</td>
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
    }
}

export default BookList;
