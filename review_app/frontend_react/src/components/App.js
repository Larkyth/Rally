import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
    }

    // Component render
    render() {
        return <h1>App.js rendered this.</h1>;
    }
}

const temp = document.getElementById("reactapp");
render(<App />, temp);