import React, { Component } from 'react'

import  Header from './headeradmin';
import Header2 from './header2';

export default class adminDashboard extends Component {
    render() {
        return (
            <div>
                   <Header2 />
                   <Header />
                <div className="content-wrapper1" style={{ marginleft: "0 px" }}>
                    <section id="candidates" className="content-header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 bg-white1 padding-2">
                                    <div className="box-header1 with-border">
                                        <h3 className="box-title">Dashboard<b></b></h3>
                                    </div>
                                    <div className="row">
                                        <div className="admin-body">
                                            <a href="adminprofile">
                                                <div className="admin-cont">
                                                    <i className="fa fa-user"></i>
                                                    <div className="admintitle">
                                                        <h4>Admin Profile </h4>
                                                    </div>
                                                </div></a>
                                            <a href="userdetails">
                                                <div className="admin-cont">
                                                    <i className="fa fa-users"></i>
                                                    <div className="admintitle">
                                                        <h4>Users </h4>
                                                    </div>
                                                </div></a>

                                            <a href="bookdetails">
                                                <div className="admin-cont">
                                                    <i className="fa fa-book"></i>
                                                    <div className="admintitle">
                                                        <h4>Books</h4>
                                                    </div>
                                                </div></a>
                                          

                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                </div>
   
            </div>

        )
    }
}
