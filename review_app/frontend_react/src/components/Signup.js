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

      role: "",

      // State of process
      errors: "",
    };

    // Bind form handlers to component
    this.handleInput = this.handleInput.bind(this);
    this.recordRole = this.recordRole.bind(this);

    // Submission handler
    this.handleSubmission = this.handleSubmission.bind(this);
    
    // Form errors per feedback from backend
    this.listErrors = this.listErrors.bind(this);

  }


  static propTypes = {
    signup: PropTypes.func.isRequired, // imported signup action
    loggedin: PropTypes.bool,
    errors: PropTypes.object,
  };


  // Handle form input
  handleInput = (e) => {
    this.setState({ 
      ...this.state,
      [e.target.id]: e.target.value,
    });
  }

  recordRole = (e) => {
    console.log(e.target.value)
    this.setState({
      ...this.state,
      role: e.target.value,
    })
  }

  // Submit sign up form - sends a POST request to API
  handleSubmission() {

    // Note that basic HTML5 input required attribute satisfies 
    // the only frontend form validation needed (all fields filled)

    console.log(this.state);

    // Call the Redux signup action
    this.props.signup(this.state.username, this.state.password, this.state.email, this.state.first_name, this.state.last_name, this.state.role);

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


  // Content presentation
  render() {

    // Redirect if signup successful
    if(this.props.loggedin) { 
      return <Redirect to="/login" /> 
    }

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
                      id="username"
                      className="form-control"
                      value={this.state.username} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">First name:</label>
                    <input 
                      type="text" 
                      required 
                      id="first_name"
                      className="form-control"
                      value={this.state.first_name} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">Surname:</label>
                    <input 
                      type="text" 
                      required 
                      id="last_name"
                      className="form-control"
                      value={this.state.last_name} 
                      onChange={this.handleInput} 
                    />
                </div>
                <div className="form-group row">
                  <label className="form-label mt-4">Email:</label>
                    <input 
                      type="email" 
                      required 
                      id="email"
                      className="form-control"
                      value={this.state.email} 
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
                  <label className="roletitle" >Role</label>
                  <div className="btn-group d-flex" role="group" >
                    <input 
                      type="radio" 
                      required
                      className="btn-check" 
                      name="btnradio" 
                      id="supervisor-btn"  
                      checked={this.state.role === "Supervisor"} 
                      value="Supervisor" 
                      onChange={this.recordRole} 
                    />
                    <label className="btn btn-outline-primary" htmlFor="supervisor-btn">Supervisor</label>
                    <input 
                      type="radio" 
                      required
                      className="btn-check" 
                      name="btnradio" 
                      id="mentor-btn" 
                      checked={this.state.role === "Mentor"} 
                      value="Mentor" 
                      onChange={this.recordRole} 
                    />
                    <label className="btn btn-outline-primary" htmlFor="mentor-btn">Mentor</label>
                    <input 
                      type="radio" 
                      required
                      id="btn-check"
                      className="btn-check" 
                      name="btnradio" 
                      id="student-btn" 
                      checked={this.state.role === "Student"} 
                      value="Student" 
                      onChange={this.recordRole}
                    />
                    <label className="btn btn-outline-primary" htmlFor="student-btn">Student</label>
                  </div>
                </div>

                <br />
                <button 
                  type="submit"
                  className="btn btn-primary" 
                >Submit</button>
                <br />
                <div className="form-group row">
                  {this.listErrors()}
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
  loggedin: state.rallyusers.loggedin,
  errors: state.rallyusers.errors,
});

// Make signup() action call available
export default connect(mapStateToProps,{ signup })(Signup);