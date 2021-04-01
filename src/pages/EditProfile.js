import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import {getUser, editUser} from "../requests/profileRequest";

export default class EditProfile extends Component {

    state = {
        name: "",
        bio: "",
        phone: "",
        email: "",
        password: ""
    }

    async componentDidMount() {
        try {
            const userID = localStorage.getItem("userID");
            const user = await getUser(userID);
            let {displayName, bio, phoneNumber, email, password} = user;
            password = !password ? "" : password;
            phoneNumber = !phoneNumber ? "" : phoneNumber;
            bio = !bio ? "" : bio;

            this.setState({
                name: displayName, bio, phone: phoneNumber, email, password
            })
        } catch (error) {
            console.log(error);
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            const {name, bio, phone, email, password} = this.state;
            const updatedUserData = await editUser({
                displayName: name, bio, phoneNumber: phone, email, password
            });
            console.log(updatedUserData)
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {onChange, onSubmit} = this;
        const {name, bio, phone, email, password} = this.state;

        return (
            <div className="profile-page edit-profile-page">
                <Navbar/>
                <div className="profile-wrapper">
                    <div className="container">

                        <div className="profile-wrapper__header">
                            <Link to="/profile">
                                <div className="icon">
                                    <span class="material-icons">
                                        arrow_back_ios_new
                                    </span>
                                </div>
                                <div className="content">
                                    Back
                                </div>
                            </Link>
                        </div>

                        <div className="profile-wrapper__body">

                            <div className="profile-wrapper__header profile-wrapper-body__header">
                                <h2>Change Info</h2>
                                <h5>Changes will be reflected to every services</h5>
                            </div>

                            <form id="edit-profile-form" onSubmit={onSubmit}>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" id="name" name="name" value={name} placeholder="Enter your name..." onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label>Bio</label>
                                    <textarea className="form-control" id="bio" name="bio" placeholder="Enter your bio..." onChange={onChange} value={bio}></textarea>
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input className="form-control" id="phone" name="phone" value={phone} placeholder="Enter your phone..." onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email..." onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password..." onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>

                            </form>

                        </div>

                        <div className="login-footer">
                            <ul>
                                <li>created by <span>Nguyen Tan Thang</span></li>
                                <li>devChallenges.io</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            
        )
    }
}
