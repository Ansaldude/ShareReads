
import React, { Component } from 'react';
import axios from 'axios';

class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            name: '',
          
            email: '',
        subject:'',
        message:'',
        nameError: '',

        subjectError: '',
        emailError: '',
   messageError: '',
        navigate: false,  
            navigate: false,
        };
    }

    setError = () => {
        let isError = false;
        const errors = {
            nameError: '',
      
            subjectError: '',
            emailError: '',
            messageError: '',
        };

        // Validation rules
        if (!this.state.name) {
            isError = true;
            errors.nameError = 'Please enter your  name';
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
               name: this.state.name,
             
               subject: this.state.subject,
                email: this.state.email,
             message: this.state.message,
              
            };

            axios.post('http://localhost:3000/contact', data)
                .then(() => {
                    this.setState({ navigate: true });
                })
                .catch(error => {
                    console.error('Registration failed:', error);
                });
        }
    };
    render() {

        return (

            <div>
            
                 <section id="hero">
              
                                        
              <div class="hero-container" data-aos="fade-up">
                  <h1>Discover Your Next Great Read with ShareReads </h1>
                  <h2>Explore Thousands of Books, Anytime, Anywhere</h2>
                  <a href="/browse" class="btn-get-started ">Browse Books</a>
      <a href="/signup" class="btn-get-started ">Sign Up for Free</a>
              </div>
          </section>
          <main id="main">
                    <div id="about" class="about-area area-padding">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="section-headline text-center">
                                        <h2>About Us</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6 ">
                                    <div class="well-left">
                                        <div class="single-well">
                                            <a href="#">
                                                <img id="aboutimg" src="../img/kids.jpg" alt="" />
                                            </a>
                                        </div>
                                    </div>

                                </div>

                                <div class="col-xs-6 ">
                                    <div class="well-middle">
                                        <div class="single-well">
                                            <a href="#">
                                                <h4 class="sec-head"></h4>
                                            </a>
                                            <p>
                                            
                                            Welcome to ShareRead, your number one destination for all your reading needs! Whether you're a passionate reader, a student, or just looking for a great gift, we have something for everyone. Our mission is to provide a wide variety of books at competitive prices, with a focus on excellent customer service and fast delivery.  </p>
                                            <ul>
                                                <li>
                                                    <i class="fa fa-check"></i> Competitive Prices
                                                    </li>
                                                <li>
                                                    <i class="fa fa-check"></i> Extensive Selection
                                                    </li>
                                                <li>
                                                    <i class="fa fa-check"></i> Fast and Reliable Delivery
                                                    </li>

                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                   
                    
                    <div id="team" class="our-team-area area-padding">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="section-headline text-center">
                                        <h2>Let's Start</h2>
                                        <h4>Our Best Selling
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-team-member">
                                        <div class="team-img">
                                            <a href="#">
                                                <img src="../img/puzzle.png" herf="# " alt="" id="teamimg" />
                                            </a>
                                           
                                        </div>
                                        <div class="team-content text-center">
                                            <h4>It Starts With US</h4>
                                            <p>Colleen Hover</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-team-member">
                                        <div class="team-img">
                                            <a href="quiz1">
                                                <img src="../img/quiz.png" alt="" id="teamimg" />
                                            </a>
                                           
                                        </div>
                                        <div class="team-content text-center">
                                        <h4>It End With Us</h4>
                                            <p>Colleen Hoover</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-team-member">
                                        <div class="team-img">
                                            <a href="course">
                                                <img src="../img/learn.jpg"  alt="" id="teamimg" />
                                            </a>
                                            
                                        </div>
                                        <div class="team-content text-center">
                                        <h4>The Alchemist</h4>
                                            <p>Paulo Coelho</p>
                                        </div>
                                    </div>
                                </div>
                              

                               
                        </div>
                        </div>
                    </div>
                    <div class="reviews-area">
                        <div class="row no-gutters">

                            <div class="col-lg-6 work-right-text d-flex align-items-center">
                                <div class="textcontact text-center">
                                   
                                    <h5>Our dedicated customer support team is here to assist you with any questions or concerns.</h5>
                                    <a href="#contact" class="ready-btn scrollto">Contact us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contact" class="contact-area">
                        <div class="contact-inner area-padding">
                            <div class="contact-overly"></div>
                            <div class="container ">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <div class="section-headline text-center">
                                            <h2>Contact us</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="contact-icon text-center">
                                            <div class="single-icon">
                                                <i class="fa fa-mobile"></i>
                                                <p>
                                                    Call: +123 456 789<br />
                                                    <span>Monday-Friday (9am-5pm)</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="contact-icon text-center">
                                            <div class="single-icon">
                                                <i class="fa fa-envelope-o"></i>
                                                <p>
                                                    Email: read@gmail.com<br />
                                                    <span>Web: www.read.com</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-4 col-sm-4 col-xs-12">
                                        <div class="contact-icon text-center">
                                            <div class="single-icon">
                                                <i class="fa fa-map-marker"></i>
                                                <p>
                                                    Location:Sinamangal, Kathmandu<br />
                                                    <span>Nepal</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">


                                    <div class="col-md-6 col-sm-6 col-xs-12">

                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27689201412!2d85.29111313454997!3d27.70903193365019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2z4KSV4KS-4KSg4KSu4KS-4KSh4KWM4KSBIDQ0NjAw!5e0!3m2!1sne!2snp!4v1567882901888!5m2!1sne!2snp" width="100%" height="380" frameborder="0" allowfullscreen></iframe>

                                    </div>



                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="form contact-form">
                                            <form action="" method="post" role="form" class="php-email-form">
                                                <div class="form-group">
                                                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars"
                                                    value={this.state.name}  onChange={(event) =>
                                                        this.setState({ name: event.target.value })}/>
                                                    <div class="validate"></div>
                                                </div>
                                                <div class="form-group">
                                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email"
                                                     value={this.state.email} onChange={(event) =>
                                                        this.setState({ email: event.target.value })}  />
                                                    <div class="validate"></div>
                                                </div>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" 
                                                     value={this.state.subject} onChange={(event) =>
                                                        this.setState({subject: event.target.value })} />
                                                    <div class="validate"></div>
                                                </div>
                                                <div class="form-group">
                                                    <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"
                                                     value={this.state.message} onChange={(event) =>
                                                        this.setState({ message: event.target.value })} ></textarea>
                                                    <div class="validate"></div>
                                                </div>
                                                <div class="mb-3">
                                                    <div class="loading">Loading</div>
                                                    <div class="error-message"></div>
                                                    <div class="sent-message">Your message has been sent. Thank you!</div>
                                                </div>
                                                <div class="text-center"><button type="submit" onClick={this.sendUser}>Send Message</button></div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </main>

            </div>
        )
    }


}
export default Home

