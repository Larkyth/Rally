import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";


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
      errors: null,
    };

    // Bind form handlers to component
    this.handleInput = this.handleInput.bind(this);
    // Submission handler
    this.handleSubmission = this.handleSubmission.bind(this);

   }

  static propTypes = {
    login: PropTypes.func.isRequired, // imported login action
    loggedin: PropTypes.bool,
  };


  // Handle form input
  handleInput = (e) => {
    this.setState({ 
      [e.target.className]: e.target.value,
    });
  }
  

  // Submit login form - sends a POST request to API 
  handleSubmission() {

    // Note that HTML5 measures satisfies basic frontend input validation

    // Use the login action to submit and handle post request
    this.props.login(this.state.username, this.state.password);

    // console.log(this.props.errors["error"]);
    // console.log(this.props.errors);

    // if(!(this.props.errors == null)) {
    //   this.setState({
    //     errors: this.props.errors["error"],
    //   });
    // }

  } 



  render() {

    // Redirect if login successful (checking state of reducer, mapped to prop)
    if(this.props.loggedin) { 
      //console.log("Logged in!")
      return <Redirect to="/" /> 
    }

    // const {username, password} = this.state;

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
                        className="username" 
                        value={this.state.username} 
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
                  <div className="form-group row">
                    <ul>
                      {this.state.errors}
                    </ul>
                  </div>
                  <br />
                  <button 
                    type="submit"
                    className="btn btn-primary"
                  >Submit</button>

                  <div className="form-group row">
                    <Link to="/signup">Need an account?</Link>
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