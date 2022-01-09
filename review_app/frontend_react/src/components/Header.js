import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { logout } from "../actions/rallyusers";

import PropTypes from 'prop-types';


// Header nav bar
export class Header extends Component {
  constructor(props) {
    super(props);

    this.linkSetup = this.linkSetup.bind(this);
  }


  static propTypes = {
    logout: PropTypes.func.isRequired,  // imported logout action
    loggedin: PropTypes.bool,
  };


  // "home": <Link to="/" className="nav-link active" aria-current="page" >Home</Link>

  // Conditional rendering of header links
  linkSetup() {

    if(this.props.loggedin) {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item" onClick={this.props.logout}><Link to="/logout" className="nav-link">Logout</Link></li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
              Profile
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/signup" className="dropdown-item">Signup</Link>
              </li>
            </ul>
          </li>
        </ul>
        
      )
    } 
    else {
      return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to="/signup" className="nav-link">Signup</Link></li>
        </ul>
      )
    }
  }
  

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">
              <img src="static/frontend/favicon.png" alt="Rally!" height="40" width="40" />
              <Link to ="/" className="navbar-brand">Rally!</Link>
            </span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {this.linkSetup()}
                <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  // Map relevant values from reducer state
  user: state.rallyusers,
  loggedin: state.rallyusers.loggedin,
});

// Make logout action call available
export default connect(mapStateToProps,{ logout })(Header);