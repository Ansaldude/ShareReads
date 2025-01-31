import React from 'react';
import Header from './header2';
import Footer from './footer';
import Nav from './nav';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Book extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "", // User ID
            book: '',
            author: '',
            price: '',
            delivery: "",
            genre: '',
            rating: '',
            description: "",
            image: null, // Store image file
            success: "",
            error: "",
            navigate: false,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/logincheck', this.state.config)
            .then(response => {
                console.log('Login Check Response:', response.data); // Log response data
                if (response.data && response.data._id) {
                    this.setState({
                        user: response.data,
                        id: response.data._id
                    });
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }

    setError = () => {
        let isError = false;
        const errors = {
            bookerror: '',
            authorerror: '',
            priceerror: '',
            deliveryerror: "",
            genreerror: '',
            ratingerror: '',
            descriptionerror: "",
        };

        if (!this.state.book) {
            isError = true;
            errors.bookerror = 'Book name is required';
        }
        if (!this.state.author) {
            isError = true;
            errors.authorerror = 'Author name is required';
        }
        if (!this.state.price) {
            isError = true;
            errors.priceerror = 'Price is required';
        }
        if (!this.state.delivery) {
            isError = true;
            errors.deliveryerror = 'Delivery charge is required';
        }
        if (!this.state.genre) {
            isError = true;
            errors.genreerror = 'Genre is required';
        }
        if (!this.state.rating) {
            isError = true;
            errors.ratingerror = 'Rating is required';
        }
        if (!this.state.description) {
            isError = true;
            errors.descriptionerror = 'Description is required';
        }

        this.setState(errors);

        return isError;
    };

    handleChange = (e) => {
        if (e.target.name === 'image') {
            this.setState({
                image: e.target.files[0]
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    postdata = (e) => {
        e.preventDefault();
        const err = this.setError();
        if (!err) {
            const formData = new FormData();
            formData.append('user_id', this.state.id || '');
            formData.append('book', this.state.book);
            formData.append('author', this.state.author);
            formData.append('price', this.state.price);
            formData.append('delivery', this.state.delivery);
            formData.append('genre', this.state.genre);
            formData.append('rating', this.state.rating);
            formData.append('description', this.state.description);
            if (this.state.image) {
                formData.append('image', this.state.image);
            }

            axios.post('http://localhost:3000/createpost', formData, this.state.config)
                .then(response => {
                    console.log('Post created successfully:', response.data);
                    this.setState({ success: 'Book added successfully!', navigate: true });
                })
                .catch(error => {
                    console.error('Error while adding book:', error.response ? error.response.data : error.message);
                    this.setState({ error: 'Failed to add book. Please try again.' });
                });
        }
    };

    render() {
        if (this.state.navigate) {
            return <Navigate to={`/userbooks/${this.state.id}`}  />;
        }

        const genres = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Fantasy", "Biography"];

        return (
            <div>
                <Nav />
                <Header />
                <div className="content-wrapper1">
                    <section id="candidates" className="content-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 bg-white padding-2">
                                    <form onSubmit={this.postdata}>
                                        <div className="box box-primary">
                                            <div className="box-header with-border">
                                                <h3 className="box-title">MAKE IT CHEAP</h3>
                                            </div>
                                            <div className="box-body">
                                                {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                                                {this.state.success && <div className="alert alert-success">{this.state.success}</div>}
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="book"
                                                        placeholder="Book name"
                                                        value={this.state.book}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="author"
                                                        placeholder="Author name"
                                                        value={this.state.author}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="price"
                                                        placeholder="Price in Rs."
                                                        value={this.state.price}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        className="form-control"
                                                        name="delivery"
                                                        placeholder="Delivery Charge"
                                                        value={this.state.delivery}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <select
                                                        className="form-control"
                                                        name="genre"
                                                        value={this.state.genre}
                                                        onChange={this.handleChange}
                                                    >
                                                        <option value="">Select Genre</option>
                                                        {genres.map((genre, index) => (
                                                            <option key={index} value={genre}>
                                                                {genre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="rating" step="0.1" min="1" max="5"
                                                        placeholder="Book Ratings"
                                                        value={this.state.rating}
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        name="description"
                                                        placeholder="Description"
                                                        value={this.state.description}
                                                        onChange={this.handleChange}
                                                    ></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="image"
                                                        onChange={this.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="box-footer">
                                                <div className="postdata">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        id="insert"
                                                    >
                                                        ADD
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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

export default Book;
