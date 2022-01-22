import React, { Component } from "react";
import { render } from "react-dom";

import Select from "react-select";
import AsyncSelect from "react-select";

import { listUsers } from "../actions/rallyusers";
import { createMeeting } from "../actions/rallymeetings";
import { connect } from "react-redux";
import PropTypes from 'prop-types';



// Create meeting form
export class CreateMeeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            agenda: "",

            creator: this.props.user,
            currentSelection: [],

            start_date: "2022-01-01T00:00",
            end_date: "2022-01-01T00:01",

            errors: "",
        }

        // Helper for limiting
        this.getOptions = this.getOptions.bind(this);

        // Form handlers
        this.handleInput = this.handleInput.bind(this);
        this.handleSelection = this.handleSelection.bind(this);

        // Submission handler
        this.handleSubmission = this.handleSubmission.bind(this);

    }

    static propTypes = {
        listUsers: PropTypes.func.isRequired,
        createMeeting: PropTypes.func.isRequired,
      };


    componentDidMount() {

        // Retrieve user list for form options on mount
        this.props.listUsers();

    }

    // Set attendee options from reducer store
    getOptions() {

        if(this.props.users) {

            const userList = (this.props.users).map(u => ({
                label: u.user.first_name + " " + u.user.last_name + " (" + u.role + ")",
                value: u,
            }
            ));
    
            return userList;

        }
        else {
            const userList = []
            return userList;
        }



        /* Old version for JSX */
        // const userList = (this.props.users).map(u => (
        //     <option key={u.user.id}>{u.user.first_name} {u.user.last_name} ({u.tempfield})</option>
        // ));
        // console.log(userList)
        // return userList;

    }   

    // Handle general form input
    handleInput = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value,
        });
    }

    // Handle multi-selection - stores currently selected items (not added to form submission yet)
    handleSelection = (e) => {
        // Note the selection value is the Rally user's id
        this.setState({
            //currentSelection: value,
            currentSelection: e,
        });

        // If array is empty, make it null

        console.log(this.state)
    }

    // Handle form submission
    handleSubmission() {

        /*
        Checks: 
        - Min two attendees
        - End date > start date
        */

        // Minimum two users must be recorded in attendance
        if(this.state.currentSelection.length <= 1) {
            this.setState({
                errors: "Not enough users: a meeting must have at least 2 expected attendees."
            })
        } 
        // End date > start date
        // else if() {

        // }
        else {

            console.log(this.state)

            // Submit form
            this.props.createMeeting(
                this.state.title,
                this.state.agenda,
                this.state.start_date,
                this.state.end_date,
                this.state.creator,
                this.state.currentSelection,
        );

        }


    }

    render() {

        return (

            <div id="createMeeting">
                <div className="card-title"><h2>Create Meeting</h2></div>

                <div container="fluid">
                <div className="createMeetingForm">
                <form onSubmit={this.handleSubmission} >
                    <fieldset>
                        <div className="form-group row">
                        <label className="form-label mt-4">Title:</label>
                            <input 
                                type="text" 
                                id="title"
                                className="form-control" 
                                value={this.state.title} 
                                onChange={this.handleInput} 
                            />
                        </div>
                        <div className="form-group row">
                        <label className="form-label mt-4">Agenda:</label>
                            <textarea 
                                id="agenda"
                                className="form-control" 
                                rows="5" 
                                placeholder="Note the items to be discussed at this meeting." 
                                value={this.state.agenda} 
                                onChange={this.handleInput}  
                            />
                        </div>
                        <div className="form-group row">
                        <label className="form-label mt-4">Start:</label>
                            <input 
                                type="datetime-local" 
                                required 
                                id="start_date"
                                className="form-control"
                                value={this.state.start_date} 
                                onChange={this.handleInput}  
                            />
                        <label className="form-label mt-4">End:</label>
                            <input 
                                type="datetime-local" 
                                required 
                                id="end_date"
                                className="form-control" 
                                value={this.state.end_date} 
                                onChange={this.handleInput}  
                            />
                        </div>
                        <div className="form-group row">
                        <label className="form-label mt-4">Select expected attendees</label>
                            <div className="input-group mb-3">
                                <div className="form-control">
                                <Select 
                                    isMulti 
                                    options={this.getOptions()}
                                    className="basic-multi-select"
                                    id="currentSelection"
                                    value={this.state.currentSelection}
                                    onChange={this.handleSelection}
                                />
                                </div> 
                            </div>
                        </div>
                        <div className="form-group row">
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

                    </fieldset>
                </form>
                </div>
                </div>

        </div>
        )
  }

}

const mapStateToProps = (state) => ({
    // Map relevant state vals for users and meetings
    user: state.rallyusers.user,        // Currently logged in user
    users: state.rallyusers.users,      // Web app user list per request to server
    userErrors: state.rallyusers.errors,
    submitErrors: state.rallymeetings.errors,
  });
  
// Make listUsers() action call available
export default connect(mapStateToProps,{ listUsers, createMeeting })(CreateMeeting);