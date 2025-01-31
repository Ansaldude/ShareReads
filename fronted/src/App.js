import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './component/PrivateRouter';

import Login from './component/login';
import Signup from './component/signup';

import Home1 from './container/home';
import Home2 from './container/home2';
import Book from './component/addbook';
import Booklist from './component/booklist';
import About from './component/about';
import Category from './container/category';
import Genre from './container/genre';
import ViewBook from './component/bookdetails';
import Cart from './component/cart';
import Payment from './component/payment';
import PaymentSuccess from './component/paymentsucces';
import Profile from './component/profile';
import UserBooks from './component/userbook';

import Admin from './container/Admin/signup';
import User from './container/Admin/userdetails';
import Bookdetails from './component/Admin/book';
import Paymentdetails from './component/Admin/payment';
import Dashboard from './component/Admin/dashboard';
import Adminprofile from './component/Admin/profile';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/home" element={<Home2 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>} />
          <Route path="/addadmin" element={<Admin/>} />
          <Route path="/allbooks" element={<Booklist />} />
          <Route path="/category" element={<Category />} />
          <Route path="/bookcategory" element={<Genre />} />
          <Route path="/books/:bookId" element={<ViewBook/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userbooks/:userId" element={<UserBooks/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          <Route path="/userdetails" element={<User/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/bookdetails" element={<Bookdetails/>} />
          <Route path="/paymentdetails" element={<Paymentdetails/>} />
          <Route path="/adminprofile" element={<Adminprofile/>} />
        </Routes>
        
        <PrivateRoute path="/addbook" element={<Book />} />
    
        
                   
     
      </BrowserRouter>
    );
  }
}

export default Router;
