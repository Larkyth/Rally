import React, { Component } from 'react';
import { render } from "react-dom";


// Routing - how React handles view per url changes
// Note to self: Routes replaces traditional Switch statement from prev router version
import { HashRouter, Switch, Route, Link, Redirect, } from "react-router-dom";


import { Provider } from "react-redux";
import store from "../store";


import Header from "./Header";
import Base from "./Base";
import Login from "./Login";
import Signup from "./Signup";
import UserProfile from './UserProfile';
import PrivateRoute from './PrivateRoute';
import CreateMeeting from './CreateMeeting';


// Imported actions
import { getUser } from '../actions/rallyusers';



class App extends Component {
    constructor(props) {
        super(props);

    }


    // Before rendering the view
    componentDidMount() {

        // Check what page to display on application load - logged in vs logged out
        store.dispatch(getUser());

    }



    // Component render
    render() {

        return (
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <div>
                            <Header />
                        </div>

                        <div>   
                            <Switch>
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/signup" component={Signup} />
                                <PrivateRoute exact path="/createmeeting" component={CreateMeeting} />
                                <PrivateRoute exact path="/" component={Base} />
                            </Switch>
                        </div>
                    </div>
                </HashRouter>
            </Provider>



        );
    }
}



// Render App component in the DOM
const target = document.getElementById("reactapp");
render(<App />, target);