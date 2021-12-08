import React, { Component } from "react";
import { render } from "react-dom";

import Dash from "./Dash";

// Home page? Or base page?
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  /* 
  Needs to:
  - If logged in, render home
  - If logged out, redirect to the login page
  */
  
  render() {
    return (
      <div>
        <p>It's the home page!</p>
        <Dash />
      </div>
    );
  }


}

// Check user is logged in
function logCheck() {
  
}