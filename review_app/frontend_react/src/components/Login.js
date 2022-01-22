import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Fragment } from "react";

// Imported Redux setup
import { login } from "../actions/rallyusers";

import PropTypes from 'prop-types';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Form inputs
      username: "",
      password: "",

    };

    // Bind form handlers to component
    this.handleInput = this.handleInput.bind(this);
    // Submission handler
    this.handleSubmission = this.handleSubmission.bind(this);

    // Form errors per feedback from backend
    this.listErrors = this.listErrors.bind(this);

   }

  static propTypes = {
    login: PropTypes.func.isRequired, // imported login action
    loggedin: PropTypes.bool,
    errors: PropTypes.object,
  };


  // Handle form input
  handleInput = (e) => {
    this.setState({ 
      [e.target.id]: e.target.value,
    });
  }
  

  // Submit login form - sends a POST request to API 
  handleSubmission() {

    // Note that HTML5 measures satisfies basic frontend input validation
    // Use the login action to submit and handle post request
    this.props.login(this.state.username, this.state.password);

  } 


  // List any backend errors received from a failed login attempt (i.e. incorrect credentials)
  listErrors() {

    // Check errors exist in reducer state
    if(this.props.errors) {

      const errorValues = Object.values(this.props.errors);
      const errorList = errorValues.map((error) => 
        <p key={error}>Error: {error}</p>
      )

      return errorList;
    }
    // Else, no errors to display 
    else {
      const errorList = [];
      return errorList;
    }

  }


  render() {

    // Redirect if login successful (checking state of reducer, mapped to prop)
    if(this.props.loggedin) { 
      //console.log("Logged in!")
      return <Redirect to="/" /> 
    }


    return (
      
      <div id="auth">
        <div className="card border-primary mb-3" >
          <div className="card-body">
            <div className="card-title"><h2>Login</h2></div>

            <div container="fluid">
            <div className="loginform">
              <form onSubmit={this.handleSubmission} >
                <fieldset>
                  <div className="form-group row">
                  <label className="form-label mt-4">Username:</label>
                      <input 
                        type="text" 
                        required 
                        id="username"
                        className="form-control"
                        value={this.state.username} 
                        onChange={this.handleInput} 
                      />
                  </div>
                  <div className="form-group row">
                    <label className="form-label mt-4">Password:</label>
                      <input 
                        type="password" 
                        required 
                        id="password"
                        className="form-control" 
                        value={this.state.password} 
                        onChange={this.handleInput}  
                      />
                  </div>
                  <div className="form-group row">
                    {this.listErrors()}
                  </div>
                  <br />
                  <div className="form-group">
                    <button 
                      type="submit"
                      className="btn btn-primary"
                    >Submit</button>
                  </div>

                  <div className="form-group row">
                    <Link to="/signup">Register</Link>
                  </div>

                </fieldset>
              </form>
              </div>
            </div>

          </div>
        </div>
      </div>

    )
  }

}

const mapStateToProps = (state) => ({
  // Map relevant values from reducer state
  loggedin: state.rallyusers.loggedin,
  errors: state.rallyusers.errors,
});

// Make login() action call available
export default connect(mapStateToProps,{ login })(Login);