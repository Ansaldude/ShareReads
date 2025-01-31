import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router';

import  Header from './headeradmin';
import Header2 from './header2';

class Editprofilepage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            user: '',
            image: '',
            imagePreviewUrl: '',
            config: {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        }
    }



    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }


    componentDidMount() {
        axios.get('http://localhost:3000/logincheck', this.state.config)
            .then((response) => {
                //S alert(response.data.fname)
                this.setState({
                    user: response.data,
                    id: response.data._id,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    username: response.data.username,
                    email: response.data.email,
                    password: response.data.password
                })

            })

    }

    UpdateData = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
           
            password: this.state.password
        }
        axios.put("http://localhost:3000/updates/" + this.state.id, data).then(
            setTimeout(function () {
                alert("Successfully updated");
                window.location.reload();
            }, 1000)
        )

    }
    handlechange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }

    render() {

        return (
            <div >
 
 <Header2 />
                   <Header />
                   <div className="content-wrapper1">
                    <div className="register-box">

                        <div className="register-box-body1">
                        <form>
                        <h2 className="login-box-msg"> <b>Admin profile </b></h2>
                                <div className="box-body">
                                           
                                                <div class="row">
                                                    <div className="col-xs-6 form-group">
                                                        <label >First Name</label>
                                                        <input type="text" className="form-control" id="fname" name="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handlechange} />

                                                    </div>
                                                    <div className="col-xs-6 form-group">
                                                        <label >Last Name</label>
                                                        <input type="text" className="form-control" id="lname" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handlechange} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label for="email">Email address</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Email" value={this.state.user.email} readonly />
                                                </div>

                                                <div className=" form-group">
                                                    <label for="number">Username</label>
                                                    <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.handlechange} />
                                                </div>




                                                <div className=" form-group">
                                                    <label for="password">Password</label>
                                                    <input type="password" className="form-control" id="password" placeholder="New Password" value={this.state.user.password} readonly />
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" onClick={this.UpdateData}className="btn btn-primary btn-block btn-flat" >Submit</button>
                                                </div>
                                            </div>

                                        </form>

                        </div>




                    </div>


                </div>
            </div>


        )
    }
}
export default Editprofilepage
