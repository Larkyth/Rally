import { GET_USER, 
    USER_FOUND, 
    USER_NOT_FOUND, 
    UNAUTHORIZED, 
    CHECKING_USER, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAILED, 
    LOGOUT_SUCCESSFUL,
    LOGOUT_FAILED, 
    SIGNUP_FAILED, 
    SIGNUP_SUCCESSFUL,
} from "../actions/types.js";

const initialState = {
    loggedin: null,
    loading: false,
    user: null,
    errors: null,
};

// Define the state returned from an action to the place it is called from

/*  Check authenticated user and authorised access  */
export default function(state = initialState, action) {

    switch(action.type) {

        /*  Loading during interaction with db     */

        case CHECKING_USER:
            return {
                ...state,
                loading: true,
            };

        /*  Basic checks that client is logged in  */

        // Client is authenticated by token
        case USER_FOUND:
            return {
                ...state,
                loggedin: true,
                loading: false,
                user: action.payload,
            }

        // Client is not authenticated by token
        case USER_NOT_FOUND:
            
            return {
                ...state,
                loggedin: false,
                loading: false,
                user: null,
            }

        /*  Failed access permissions   */

        // Logged in user failed permissions check
        case UNAUTHORIZED:
            return {
                ...state,
                loggedin: true,
                loading: false,
                user: null,
                // errors: "Cannot access, user unauthorized.",
            }

        /*  Checking login submission   */

        case LOGIN_SUCCESSFUL:
            console.log("login successful")
            return {
                ...state,
                ...action.payload,
                loggedin: true,
                loading: false,
            }

        case LOGIN_FAILED:
            console.log("login failed")
            console.log(action.payload)
            return {
                ...state,
                user: null,
                loggedin: false,
                loading: false,
                // errors: action.payload,
            }

        case LOGOUT_SUCCESSFUL:
            return {
                ...state,
                user: null,
                loggedin: false,
                loading: false,
            }

        case LOGOUT_FAILED:
            return {
               ...state,
               loading: false, 
            }

        /*  Checking signup submission   */

        case SIGNUP_SUCCESSFUL:
            console.log("signup successful")
            return {
                ...state,
                user: null,
                loggedin: false,
                loading: false,
            }

        case SIGNUP_FAILED:
            console.log("signup failed")
            return {
                ...state,
                user: null,
                loggedin: false,
                loading: false,
            }

        default:
            return state;
    }
}