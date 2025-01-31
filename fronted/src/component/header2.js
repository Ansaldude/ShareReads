import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for React Router

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            id: '',
            profileImage: '',
            name: '',
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/logincheck', this.state.config)
            .then((response) => {
                this.setState({
                    isLoggedIn: true,
                    user: response.data,
                    id: response.data._id // Ensure user ID is correctly set
                });
            })
            .catch(error => {
                console.error('Error fetching user info:', error);
            });
    }

    LogOut = () => {
        axios.post('http://localhost:3000/logout')
            .then(() => {
                localStorage.removeItem('token');
                window.location.href = '/login'; // Redirect to login or home after logout
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    }

    render() {
        const { user, id } = this.state;

        return (
            <header id="header" className="fixed-top">
                <div className="container d-flex">
                    <div className="logo mr-auto">
                        <h4 className="text-light">
                            <img src="../img/logo.png" className="logoimg" alt="Logo" />
                            <Link to="/home">SHAREREADS</Link>
                        </h4>
                    </div>

                    <nav className="nav-menu d-none d-lg-block">
                        <ul>
                            <li><Link to="/home" id="home">Home</Link></li>
                            <li><Link to="/category" id="genre">Genre</Link></li>
                            <li><Link to="/about" id="about">About us</Link></li>
                            <li><Link to="/addbook" id="add">Add Book</Link></li>
                            <li><Link to="/home" id="contact">Contact us</Link></li>

                            {this.state.isLoggedIn && (
                                <li className="drop-down">
                                    <a href="#"> {user.firstname}<i className="fa fa-angle-down"></i></a>
                                    <ul>
                                        <li><Link to="/profile"><i className="fa fa-user"></i> Profile</Link></li>
                                        <li><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
                                        <li><Link to={`/userbooks/${id}`}><i className="fa fa-book"></i> My Booklist</Link></li>
                                        <li><a href="/" id="logout" onClick={this.LogOut}><i className="fa fa-arrow-circle-o-right"></i> Logout</a></li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;
