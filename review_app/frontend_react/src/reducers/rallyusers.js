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
    LIST_USERS,
    RETRIEVAL_FAILED,
} from "../actions/types.js";

const initialState = {
    loggedin: null,
    loading: false,
    user: null,
    errors: null,
    users: [],
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
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                loggedin: true,
                user: action.payload,
            }

        // Client is not authenticated by token
        case USER_NOT_FOUND:
            console.log("reducer comment: user wasn't found (unauthenticated)")
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

        // Return list of registered users, for use in sign up process
        case LIST_USERS:
            console.log("reducer comment: users listed and stored in rallyusers['users']")
            return {
                ...state,
                users: action.payload,
                loggedin: true,
                loading: false,
            }

        case RETRIEVAL_FAILED:
            console.log("reducer comment: user list retrieval failed")
            return {
                ...state,
                users: null,
                loading: false,
            }

        /*  Login/Logout   */

        case LOGIN_SUCCESSFUL:
            console.log("reducer comment: login successful")
            return {
                ...state,
                user: action.payload,
                loggedin: true,
                loading: false,
                errors: null,
            }

        case LOGIN_FAILED:
            console.log("reducer comment: login failed")
            return {
                ...state,
                loading: false,
                loggedin: false,
                user: null,
                errors: action.payload,
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

        /*  Sign up   */

        case SIGNUP_SUCCESSFUL:
            console.log("signup successful")
            return {
                ...state,
                user: action.payload,
                loggedin: true,
                loading: false,
                errors: null,
            }

        case SIGNUP_FAILED:
            console.log("signup failed")
            return {
                ...state,
                user: null,
                loggedin: false,
                loading: false,
                errors: action.payload,
            }

        default:
            return state;
    }
}