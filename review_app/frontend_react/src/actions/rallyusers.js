import { GET_USER, 
    USER_FOUND, 
    USER_NOT_FOUND, 
    UNAUTHORIZED, 
    CHECKING_USER, 
    LOGIN_SUCCESSFUL, 
    LOGIN_FAILED, 
    SIGNUP_FAILED, 
    SIGNUP_SUCCESSFUL,
    LOGOUT_FAILED,
    LOGOUT_SUCCESSFUL, 
} from "../actions/types.js";


// Retrieve a logged in user using associated auth token, act on server response
export const getUser = () => async dispatch => {

    // Set loading state during promise process to deal with intermediate rendering
    dispatch({
        type: CHECKING_USER,
    })

    // Create request setup
    const token = localStorage.getItem("Token")
    const req1 = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Token '+token,        // Django Rest Knox Token authentication format
        },
    };
    
    // Async function to retrieve user with token
    try {
        const response = await fetch("/rally/getuser", req1);

        // If token authentication successful
        if(response.ok) {

            dispatch({
                type: USER_FOUND,
                payload: response.data,
            });
        }         
        // Else, deny request
        else {

            // Will need additional work here for redirecting on permissions vs failed to login

            // Clear storage of invalid/rejected token
            localStorage.clear();

            dispatch({
                type: USER_NOT_FOUND,
            });
        }
    }    
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        dispatch({
            type: USER_NOT_FOUND,
        });
    }
}


// LOGIN: Send a request with auth token, receive result
export const login = (username, password) => async dispatch => {
    
    // Set loading state during promise process to deal with intermediate rendering
    dispatch({
        type: CHECKING_USER,
    })

    // Set up POST request
    const req2 = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            username: username,
            password: password,
          }),
      };

    // Async function to handle the fetch request
    try {
        const response = await fetch("/rally/login", req2);

        // If login failed on server side
        if(!response.ok) {

            const result = await response.json();
            console.log(result);

            dispatch({
                type: LOGIN_FAILED,
                payload: result,
            });

        }
        // Else, logged in + store token
        else {
            // Store retrieved auth token
            const result = await response.json();
            console.log(result);
            localStorage.setItem("Token", result.token);

            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data,
            });

        }

    }
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        dispatch({
            type: LOGIN_FAILED,
        });
    }
};

// LOGOUT
export const logout = () => async dispatch => {

    // Set loading state during promise process to deal with intermediate rendering
    dispatch({
        type: CHECKING_USER,
    })

    // Set up POST request
    const token = localStorage.getItem("Token")
    const req1 = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Token '+token,        // Django Rest Knox Token authentication format
        },
    };

    // Response handling: fetch catch, response ok = redirect 
    try {
        const response = await fetch("/rally/logout", req1);

        // If ok, clear token store
        if(response.ok) {

            localStorage.clear();

            dispatch({
                type: LOGOUT_SUCCESSFUL,
            });

        }
        // Else, logout failed on server side
        else {

            dispatch({
                type: LOGOUT_FAILED,
                // payload: response.data,
            });

        }

    }
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        console.log("Fetch error during logout");

        dispatch({
            type: LOGOUT_FAILED,
        });
    }


}

// SIGNUP: Request user creation, receive associated auth token
export const signup = (username, password, email, first_name, last_name) => async dispatch => {

    // Set loading state during promise process to deal with intermediate rendering
    dispatch({
        type: CHECKING_USER,
    })

    // Set up POST request
    const requestSetup = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          user: { 
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
          },
          tempfield: "hello",
        }),
    };
    console.log(requestSetup);

    // Async function to check signup
    try {
        const response = await fetch("/rally/signup", requestSetup);

        // If sign up failed on server side
        if(!response.ok) {
            // Clear storage for consistency
            localStorage.clear();

            dispatch({
                type: SIGNUP_FAILED,
            });
        }
        // Else, sign up successful
        else {
            // Store retrieved auth token
            const result = await response.json();
            console.log(result);
            localStorage.setItem("Token", result.token);

            dispatch({
                type: SIGNUP_SUCCESSFUL,
                payload: response.data,
            });
        }
    }
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        // Clear storage for consistency
        localStorage.clear();

        dispatch({
            type: SIGNUP_FAILED,
        });
    }


}


// Basic error parsing
export const getErrors = () => {

}