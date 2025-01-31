

import React, { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Nav from './nav';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            role: '',
            isLoggedIn: false,
           usernameerror: '',
            passworderror: ''
        }
    }

    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }
    setError = () => {
        let isError = false;
        const errors = {

            usernameerror: '',
            passworderror: '',

        };

    
        
        
        if (this.state.username === '') {
            isError = true;
            errors.usernameerror = "Please provide username";
          }
      
        if (this.state.password.length < 8) {
            isError = true;
            errors.passworderror = "Password must be atleast 8 character";
        }

        this.setState({
            ...this.state,
            ...errors
        })

        return isError;
    }
    submitForm = (e) => {
        e.preventDefault();
        const err = this.setError();
        if (!err) {
            axios.post('http://localhost:3000/login', this.state)
                .then((response) => {
                    console.log(response.data)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.user.role)
                    // alert(response.data.user.user_type)
                    this.setState({ isLoggedIn: true })

                }).catch((err) => console.log(err.response))
            this.setState({ username: '', password: '' })
        }
    }
    render() {
        // alert(localStorage.getItem('user_type'))
        if (this.state.isLoggedIn === true && localStorage.getItem('role') == "buyer") {
            return <Navigate to='/addbook' />
        } if (this.state.isLoggedIn === true && localStorage.getItem('role') == "admin") {
            return <Navigate to='/addadmin' />
        }
      
        return (
            <div>
                     <Nav/>
                     <Header />
            <div className="login-container">
              <div className="login-content">
                <div className="wrapper">
                  <form >
                    <h1>Login</h1>
                    <div className="input-box">
                    <input type='username' class="form-control input" placeholder="Username" name='username' id='username' value={this.state.username} onChange={this.handleChange} />
                                      <error className="errormsg">
                                          {this.state.usernameerror}
                                      </error>
                      <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                    <input type='password' class="form-control input" placeholder="Password" name='password' id='password' value={this.state.password} onChange={this.handleChange} />
                                      <error className="errormsg">
                                          {this.state.passworderror}
                                      </error>
                                     
                      <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="remember-forgot">
                      <label><input type="checkbox" /> Remember Me</label>
                      <a href="/">Forgot Password</a>
                    </div>
                    <button type="submit"  onClick={this.submitForm} className="btn">Login</button>
                    <div className="register-link">
                      <p>Don't have an account? <a href="/signup">Register</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <Footer/>
          </div>


        )
    }


}

export default Login
