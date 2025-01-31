import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Nav from './nav';
import Header from './header2';
import Footer from './footer';

class Editprofilepage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            currentPassword: '', // Added field for current password
            newPassword: '', // Added field for new password
            user: '',
            image: '',
            imagePreviewUrl: '',
            config: {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        };
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    };

    componentDidMount() {
        axios.get('http://localhost:3000/logincheck', this.state.config)
            .then((response) => {
                this.setState({
                    user: response.data,
                    id: response.data._id,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    username: response.data.username,
                    email: response.data.email
                });
            });
    }

    UpdateData = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            currentPassword: this.state.currentPassword, // Send current password for verification
            newPassword: this.state.newPassword // Send new password for updating
        };

        axios.put(`http://localhost:3000/updates/${this.state.id}`, data)
            .then(() => {
                alert("Successfully updated");
                window.location.reload();
            })
            .catch(error => {
                alert(error.response.data.message || "Error updating profile");
            });
    };

    handlechange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <Nav />
                <Header />
                <div className="content-wrapper1">
                    <section id="candidates" className="content-header2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 bg-white padding-2">
                                    <div className="box box-primary">
                                        <div className="img-form">
                                            <div className="title-post">
                                                <h2><i>Account Information</i></h2>
                                            </div>
                                        </div>

                                        <form>
                                            <div className="box-body">
                                                <div className="row">
                                                    <div className="col-xs-6 form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handlechange} />
                                                    </div>
                                                    <div className="col-xs-6 form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handlechange} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email address</label>
                                                    <input type="email" className="form-control" placeholder="Email" value={this.state.user.email} readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handlechange} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Current Password</label>
                                                    <input type="password" className="form-control" name="currentPassword" placeholder="Enter current password" value={this.state.currentPassword} onChange={this.handlechange} />
                                                </div>
                                                <div className="form-group">
                                                    <label>New Password</label>
                                                    <input type="password" className="form-control" name="newPassword" placeholder="Enter new password" value={this.state.newPassword} onChange={this.handlechange} />
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" onClick={this.UpdateData} className="btn-update">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
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
export default Editprofilepage;
