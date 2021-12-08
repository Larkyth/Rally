import React, { Component } from "react";
import { render } from "react-dom";


// User profile view (mainly for checking user creation)
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "blah",
            email : "blahblah",
        };
    }
    
    render() {
        return (
            <div>
                <p>Username: {this.state.username.toString()}</p>
                <p>Email: {this.state.email.toString()}</p>
            </div>
        );
    }

}