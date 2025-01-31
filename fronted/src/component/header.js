import React from 'react'



class Header extends React.Component {
    
    
    render() {

        return (
            <div>
               
                <header id="header" class="fixed-top">
                    <div class="container d-flex">

                        <div class="logo mr-auto">
                            <h4 class="text-light"><img src="../img/logo.png" class="logoimg"/><a href="/">SHAREREADS</a></h4>

                        </div>

                        <nav class="nav-menu d-none d-lg-block">
                            <ul>
                                <li ><a href="/" id="home">Home</a></li>
                                <li><a href="bookcategory" id="genre">Genre</a></li>
                                <li><a href="about" id="about">About us</a></li>      
                                <li><a href="login" id="add">Add Book</a></li>   
                                <li><a href="contact" id="add">Contact us</a></li>                   

                                <li class="drop-down"><a href="">Login<i class="fa fa-angle-down"></i></a>
                                    <ul>
                                        <li><a href="login" id="login">Login</a></li>

                                        <li><a href="signup" id="signup">Register</a></li>
                                    </ul>
                                </li>


                            </ul>
                        </nav>

                    </div>
                </header>
            </div>
        )
    }

}
export default Header
