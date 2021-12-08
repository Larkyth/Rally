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


  /** Form handling methods **/

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
    console.log(this.state);
  }

  render() {
    return (

      <div className="popup">
          <h2>Sign up</h2>
        <form>
          <p>
           <label>Username: 
              <input type="text" name="username" onChange={this.handleUN} />
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
