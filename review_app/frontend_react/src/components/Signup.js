import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Imported Redux setup
import { signup } from "../actions/rallyusers";
import store from "../store";

import PropTypes from 'prop-types';


export class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Form inputs
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",

      // State of process
      signupSuccess: false,
      errors: "",
    };

    // Bind form handlers to component
    this.handleInput = this.handleInput.bind(this);
    // Submission handler
    this.handleSubmission = this.handleSubmission.bind(this);
  }


  static propTypes = {
    signup: PropTypes.func.isRequired, // imported signup action
  };


  // Handle form input
  handleInput = (e) => {
    this.setState({ 
      // Might not need?
      ...this.state,
      [e.target.className]: e.target.value,
    });
  }


  // Submit sign up form - sends a POST request to API
  handleSubmission() {

    // Note that basic HTML5 input required attribute satisfies 
    // the only frontend form validation needed (all fields filled)

    console.log(this.state);

    // Call the Redux signup action
    this.props.signup(this.state.username, this.state.password, this.state.email, this.state.first_name, this.state.last_name);

  }


  // Content presentation
  render() {

    // Redirect if signup successful
    // if(this.props.signupSuccess) { 
    //   return <Redirect to="/login" /> 
    // }

    return (

      <div id="auth">
        <div className="card border-primary mb-3" >
          <div className="card-body">
            <div className="card-title"><h2>Sign up</h2></div>


            <div container="fluid">
            <div className="signupform">

            <form onSubmit={this.handleSubmission} >
              <fieldset>
                <div className="form-group row">
                  <label className="form-label mt-4">Username:</label>
                    <input 
                      type="text" 
                      required 
                      className="username" 
                      value={this.state.username} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">First name:</label>
                    <input 
                      type="text" 
                      required 
                      className="first_name" 
                      value={this.state.first_name} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">Surname:</label>
                    <input 
                      type="text" 
                      required 
                      className="last_name" 
                      value={this.state.last_name} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">Email:</label>
                    <input 
                      type="email" 
                      required 
                      className="email" 
                      value={this.state.email} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">Password:</label> 
                    <input 
                      type="password" 
                      required 
                      className="password" 
                      value={this.state.password} 
                      onChange={this.handleInput} 
                    />
                </div>
                <br />
                <button 
                  type="submit"
                  className="btn btn-primary" 
                >Submit</button>

                <div className="form-group row">
                  {this.state.errors}
                </div>
              </fieldset>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = (state) => ({
  // Map the loggedin 
  signupSuccess: state.rallyusers.loggedin,
  // errors: state.rallyusers.errors,
});

// Make signup() action call available
export default connect(mapStateToProps,{ signup })(Signup);