import React, { Component } from 'react';
import { render } from "react-dom";

// Routing - how React handles view per url changes
// Note to self: Routes replaces traditional Switch statement from prev router version
import { BrowserRouter, Route, Routes } from "react-router-dom";

// These probably don't need explicit import statements
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./UserProfile"


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    // Component render - insert components to be rendered here
    render() {
        return (

            // Note the Route elements wanted are JSX elements
            <div>
                <div>
                    <Header />
                </div>

                <div>   
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>

//                            <Route path="profile" element={<Profile />} />

        );
    }
}

// Render App component in the DOM
const target = document.getElementById("reactapp");
render(<App />, target);