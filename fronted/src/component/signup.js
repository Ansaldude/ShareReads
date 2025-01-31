import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Nav from './nav';

class SignupPage extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            role: 'buyer', // Default role
            firstnameError: '',
            lastnameError: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            navigate: false,
        };
    }

    setError = () => {
        let isError = false;
        const errors = {
            firstnameError: '',
            lastnameError: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
        };

        // Validation rules
        if (!this.state.firstname) {
            isError = true;
            errors.firstnameError = 'Please enter your first name';
        }
        if (this.state.password.length < 8) {
            isError = true;
            errors.passworderror = "Password must be atleast 8 character";
        }
        // Add validation rules for other fields

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };

    sendUser = (e) => {
        e.preventDefault();
        const err = this.setError();
        if (!err) {
            const data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role,
            };

            axios.post('http://localhost:3000/register', data)
                .then(() => {
                    this.setState({ navigate: true });
                })
                .catch(error => {
                    console.error('Registration failed:', error);
                });
        }
    };

    handleNavigate() {
        if (this.state.navigate) {
            return <Navigate to='/login' />;
        }
    }

    render() {

        return (
            <div>
                <Nav />
                <Header />

                {this.handleNavigate()}

                <div className="signup-container">
                    <div className="signup-content">
                        <div className="wrapper">
                            <form action="">
                                <h1>Register</h1>
                                <div className="input-box">
                                    <input className="form-control input" type="text" id="username" value={this.state.username} onChange={(event) =>
                                        this.setState({ username: event.target.value })} placeholder="Username" required />
                                    <error className="errormsg">
                                        {this.state.usernameerror}
                                    </error>

                                </div>
                                <div className="input-box">
                                    <input className="form-control input" type="text" id="firstname" value={this.state.firstname} onChange={(event) =>
                                        this.setState({ firstname: event.target.value })} placeholder="First name" required />
                                    <error className="errormsg">
                                        {this.state.firstnameerror}
                                    </error>

                                </div>
                                <div className="input-box">
                                    <input className="form-control input" type="text" id="lastname" value={this.state.lastname} onChange={(event) =>
                                        this.setState({ lastname: event.target.value })} placeholder="Last name" required />
                                    <error className="errormsg">
                                        {this.state.lastnameerror}
                                    </error>

                                </div>
                                <div className="input-box">
                                    <input className="form-control input" type="email" id="email" value={this.state.email} onChange={(event) =>
                                        this.setState({ email: event.target.value })} placeholder="Email" required />
                                    <error className="errormsg">
                                        {this.state.emailerror}
                                    </error>

                                </div>
                                <div className="input-box">

                                    <input className="form-control input" type="password" id="password" value={this.state.password} onChange={(event) =>
                                        this.setState({ password: event.target.value })} placeholder="Password" required />
                                    <error className="errormsg">
                                        {this.state.passworderror}
                                    </error>

                                </div>

                                <button type="submit" className="btn" onClick={this.sendUser}>Register</button>
                                <div className="register-link">
                                    <p>Already have an account? <a href="/login">Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
                <Footer />
            </div>

        )
    }
}
export default SignupPage

