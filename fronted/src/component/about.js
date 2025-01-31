
import React, { Component } from 'react';

import { Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Nav from './nav';


class About extends React.Component{

    render() {

        return (

       <div>
     <Nav/>
                  <Header />
            

           <main id="main">
<div id="about" class="about-area area-padding1">
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

               </main>

               <Footer/>
       </div>


)
    }


}
export default About