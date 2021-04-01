import React, { Component } from 'react';
import devLogo from "../images/devchallenges.svg";
import {Link} from "react-router-dom";
import {getUser} from "../requests/profileRequest";

class Navbar extends Component {

    state = {
        isExpanded: false
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

    changeExpandedValue = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        const {changeExpandedValue} = this;
        const {isExpanded, user} = this.state;

        if (!user) {
            return <></>
        }

        const {photoURL, displayName} = user;

        return (
            <div className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={devLogo} alt="logo"/>
                    </div>
                    <div className="navbar-profile" onClick={changeExpandedValue}>
                        <img src={photoURL} alt="profile"/>
                        <p>{displayName}</p>
                        <div className="navbar-profile__icon">
                            {!isExpanded ? (<span className="material-icons">
                                arrow_drop_down
                            </span>) : (<span className="material-icons">
                                arrow_drop_up
                            </span>)} 
                        </div>
                    </div>
                    {isExpanded ? (<div className="navbar-expand-tab">
                        <ul className="navbar-expand-tab__list">
                            <li className="navbar-expand-tab__item">
                                <Link to="/profile">
                                    <div className="icon">
                                        <span class="material-icons">
                                            account_circle
                                        </span>
                                    </div>
                                    <div className="content">
                                        My Profile
                                    </div>
                                </Link>
                            </li>
                            <div className="divider"></div>
                            <li  className="navbar-expand-tab__item navbar-expand-tab__item--danger">
                                <Link to="/logout">
                                    <div className="icon">
                                        <span className="material-icons">
                                            exit_to_app
                                        </span>
                                    </div>
                                    <div className="content">
                                        Logout
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>) : (<></>)}
                </div>
            </div>
        )
    }
}

export default Navbar;
