import React, { Component } from "react";
import { render } from "react-dom";
import { Navigate, Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from '../actions/rallyusers';

import Dash from "./Dash";

/*
  Base component that all protected content of the application sits within.

  PrivateRoute wrapping checks for authentication before access.
*/
export class Base extends Component {
  // static propTypes = {
  //   user: PropTypes.array.isRequired
  // }

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div>
        <h2>Home</h2>
          <p>It's the home page!</p>
          <p>Made it to the home page!!!</p>
          <Dash />
      </div>
    );
  }
}


// // Map the state of Redux to the props of the component
// // Format: "name": state.desiredReducer.desiredReducerStateValue
// const mapStateToProps = state => ({
//   user: state.rallyusers,
// })


export default Base;