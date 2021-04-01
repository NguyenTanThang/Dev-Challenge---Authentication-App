import React, { Component } from 'react';
import {signOut} from "../config/base";

export default class LogoutPage extends Component {

    async componentDidMount() {
        await signOut();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
