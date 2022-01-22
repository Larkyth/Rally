import {
    RETRIEVED_DATA,
    RETRIEVAL_FAILED,
    MEETING_CREATED,
    MEET_CREATE_FAILED,
} from "../actions/types.js";

const initialState = {
    meeting: null,
    meetings: [],
    errors: null,
};

// Define the state returned from an action to the place it is called from

export default function(state = initialState, action) {

    switch(action.type) {

        case MEETING_CREATED:
            console.log("reducer comment: meeting created");
            return {
                ...state,
                meeting: action.payload,
                errors: null,
            }

        case MEET_CREATE_FAILED:
            console.log("reducer comment: meeting creation failed");
            return {
                ...state,
                meeting: null,
                errors: action.payload,
            }

        case RETRIEVED_DATA:
            console.log("reducer comment: retrieved data list")
            return {
                ...state,
                meetings: action.payload,
            }
        case RETRIEVAL_FAILED:
            console.log("reducer comment: failed to retrieve data list")
            return {
                ...state,
            }
        default:
            return state;
    }
}