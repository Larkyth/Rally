import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";





// Pass in props and requested route requested by user
const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                // If reducer state indicates backend communication is processing, wait
                if (user.loading) {
                    // Intermediary rendering
                    return <p>Loading...</p>;
                } 
                // If stored token fails to authenticate, redirect user to login
                else if(!user.loggedin) {
                    return <Redirect to="login" />;
                }
                // Authenticated access, render component
                else {
                    return <Component {...props} />;
                }

            }
        } 
        />
    )
}


PrivateRoute.propTypes = {
    user: PropTypes.object.isRequired,
};



// Map the state of Redux to the props of the component
// Format: "name": state.desiredReducer.desiredReducerStateValue
const mapStateToProps = state => ({
    // Map the whole reducer state, will need access to multiple values
    user: state.rallyusers,
});

export default connect(mapStateToProps)(PrivateRoute);