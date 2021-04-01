import React, { Component } from 'react';
import Navbar from "../components/Navbar";
import {getUser} from "../requests/profileRequest";
import googleLogo from "../images/Google.svg";
import {Link} from "react-router-dom";

export default class Profile extends Component {

    state = {
        user: ""
    }

    async componentDidMount() {
        try {
            const userID = localStorage.getItem("userID");
            const user = await getUser(userID);

            this.setState({
                user
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {user} = this.state; 
        const {displayName, email, photoURL, phoneNumber, uid, bio} = user;

        if (!user) {
            return <></>;
        }

        return (
            <div className="profile-page">
                <Navbar user={user}/>
                <div className="profile-wrapper">
                    <div className="container">

                        <div className="profile-wrapper__header">
                            <h2>Personal info</h2>
                            <h5>Basic info, like your name and photo</h5>
                        </div>

                        <div className="profile-wrapper__body">
                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h4>Profile</h4>
                                    <p>Basic info, like your name and photo</p>
                                </div>
                                <div className="right">
                                    <Link to="/edit-profile" className="btn btn-grey">Edit</Link>
                                </div>
                            </div>
                            
                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>PHOTO</h5>
                                </div>
                                <div className="right">
                                    <img src={photoURL} alt="profile"/>
                                </div>
                            </div>

                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>NAME</h5>
                                </div>
                                <div className="right">
                                    <p>{displayName}</p>
                                </div>
                            </div>

                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>BIO</h5>
                                </div>
                                <div className="right">
                                    <p>{bio}</p>
                                </div>
                            </div>

                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>PHONE</h5>
                                </div>
                                <div className="right">
                                    <p>{phoneNumber}</p>
                                </div>
                            </div>

                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>EMAIL</h5>
                                </div>
                                <div className="right">
                                    <p>{email}</p>
                                </div>
                            </div>

                            <div className="profile-wrapper-body__item">
                                <div className="left">
                                    <h5>PASSWORD</h5>
                                </div>
                                <div className="right">
                                    <p>************</p>
                                </div>
                            </div>

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
