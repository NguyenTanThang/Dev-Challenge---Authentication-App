import React, { Component } from 'react';
import devLogo from "../images/devchallenges.svg";
import facebookLogo from "../images/Facebook.svg";
import githubLogo from "../images/Gihub.svg";
import googleLogo from "../images/Google.svg";
import twitterLogo from "../images/Twitter.svg";
import InputWithIcon from "../components/InputWithIcon";
import {signInWithGoogle, auth, createUserWithEmailAndPassword} from "../config/base";
import {Link} from "react-router-dom";
import {addNewUser} from "../requests/profileRequest";

class SignupPage extends Component {

    state = {
        email: "",
        password: ""
    }

    async componentDidMount() {
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                return;
            }
            let { displayName, email, photoURL, phoneNumber, uid, bio }  = user;
            bio = !bio ? "N/A" : bio;
            let savedUser = {
                displayName, email, photoURL, phoneNumber, uid, bio
            }
            await addNewUser(savedUser);
            localStorage.setItem("userID", uid);
            this.props.history.push("/profile");
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            const {email, password} = this.state;
            await createUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {email, password} = this.state;
        const {onChange, onSubmit} = this;

        return (
            <div className="login-page">
                <div className="login-wrapper">
                    <div className="login-container">
                        <div className="login-container__header">
                            <img src={devLogo} alt="logo"/>
                            <h3>Join thousands of learners from around the world </h3>
                            <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
                        </div>
                        <div className="login-container__body">
                            <form id="login-form" onSubmit={onSubmit}>
                                <div className="form-group">
                                    <InputWithIcon type="email"  icon={"email"} placeholder="Email" name="email" id="email" value={email} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <InputWithIcon type="password" icon={"lock"} placeholder="Password" name="password" id="password" value={password} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Start coding now</button>
                                </div>
                            </form>
                            <p>or continue with these social profile</p>
                        </div>
                        <div className="login-container__auth">
                            <ul>
                                <li onClick={signInWithGoogle}>
                                    <img src={googleLogo} alt="google"/>
                                </li>
                                <li>
                                    <img src={facebookLogo} alt="facebook"/>
                                </li>
                                <li>
                                    <img src={githubLogo} alt="github"/>
                                </li>
                                <li>
                                    <img src={twitterLogo} alt="twitter"/>
                                </li>
                            </ul>
                        </div>
                        <div className="login-container__footer">
                            <p>Adready a member? <Link to="/">Login</Link></p>
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
        )
    }
}

export default SignupPage;
