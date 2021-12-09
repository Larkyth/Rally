import React, { Component } from "react";
import { render } from "react-dom";


export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "default-username",
      first_name: "default-name",
      last_name: "default-surname",
      email: "default-email",
      password: "default-password",
    };

    // Bind form handlers to component
    this.handleUN = this.handleUN.bind(this);
    this.handleFN = this.handleFN.bind(this);
    this.handleLN = this.handleLN.bind(this);
    this.handleEM = this.handleEM.bind(this);
    this.handlePW = this.handlePW.bind(this);

    // Submission handler
    this.handleSubmission = this.handleSubmission.bind(this);
  }


  /** Form handling methods -- should condense later **/ 

  // Username -- add validators?
  handleUN(e) {
    this.setState({ username: e.target.value, })
  }

  // First name
  handleFN(e) {
    this.setState({ first_name: e.target.value, })
  }

  // Last name
  handleLN(e) {
    this.setState({ last_name: e.target.value,  })
  }

  // Email -- add validators?
  handleEM(e) {
    this.setState({ email: e.target.value,  })
  }

  // Password -- add validators?
  handlePW(e) {
    this.setState({ password: e.target.value, })
  }

  // Submit - POST request sent to backend
  handleSubmission() {
    // Will replace with link to POST request handling in backend
    console.log("Pre-request state:");
    console.log(this.state);

    const requestSetup = {
      method: 'post',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json', },
      body: JSON.stringify({
        user: { username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
        },
        tempfield: "hello",
      })
    };
    
    console.log("POST request terms:");
    console.log(requestSetup);

    fetch("/rally/signup", requestSetup)
      .then(response => response.json())
      .then(response => console.log(response));
  

  }

  render() {
    return (

      <div className="popup">
          <h2>Sign up</h2>
        <form>
          <p>
           <label>Username:
              <input type="text" name="username" placeholder={this.state.username} onChange={this.handleUN} />
            </label>
          </p>
          <p>
            <label>Forename: 
              <input type="text" name="first_name" onChange={this.handleFN} />
            </label>
          </p>
          <p>
            <label>Surname: 
              <input type="text" name="last_name" onChange={this.handleLN} />
            </label>
          </p>
          <p>
            <label>Contact (E-mail): 
              <input type="email" name="email" onChange={this.handleEM} />
            </label>
          </p>
          <p>
            <label>Password: 
              <input type="password" name="password" onChange={this.handlePW} />
            </label>
          </p>

          <input type="button" value="Submit" onClick={this.handleSubmission} />
          
        </form>
      </div>

    );
  }

}
