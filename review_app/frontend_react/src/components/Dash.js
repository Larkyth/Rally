import React, { Component } from "react";
import { render } from "react-dom";


// Dash board
export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  // One row div containing two col divs

  render() {
    return (
      <div className="dashhboard">
        
        <p>I am the dashboard.</p>
      

      </div>
    )
  }

}