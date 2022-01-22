import { 
    GET_USER, 
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
    RETRIEVED_DATA,
    RETRIEVAL_FAILED,
    LIST_USERS,
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

            const result = await response.json();
            console.log(result);

            dispatch({
                type: USER_FOUND,
                payload: result,
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

        // If logged in, store token
        if(response.ok) {

            // Store retrieved auth token
            const result = await response.json();
            localStorage.setItem("Token", result.token);

            console.log(result)

            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: result,
            });

        }
        // Else, login failed on server side
        else {

            const result = await response.json();
            console.log(result);

            dispatch({
                type: LOGIN_FAILED,
                payload: result,
            });

        }

    }
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        dispatch({
            type: LOGIN_FAILED,
            payload: error.data,
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
export const signup = (username, password, email, first_name, last_name, role) => async dispatch => {

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
          role: role,
        }),
    };
    console.log(requestSetup);

    // Async function to check signup
    try {
        const response = await fetch("/rally/signup", requestSetup);

        // If sign up failed on server side
        if(!response.ok) {
            // Clear storage for consistency
            const result = await response.json();
            localStorage.clear();

            dispatch({
                type: SIGNUP_FAILED,
                payload: result,
            });
        }
        // Else, sign up successful
        else {
            // Store retrieved auth token
            const result = await response.json();
            localStorage.setItem("Token", result.token);
            // Remove token from payload for easy storage in reducer
            delete result.token

            dispatch({
                type: SIGNUP_SUCCESSFUL,
                payload: result,
            });
        }
    }
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        // Clear storage for consistency
        const result = await response.json();
        localStorage.clear();

        dispatch({
            type: SIGNUP_FAILED,
            payload: result,
        });
    }


}


// GET_RALLYUSERS: Retrieve a list of users registered to the application
export const listUsers = () => async dispatch => {

    // Create request setup
    const token = localStorage.getItem("Token")
    const req1 = {
        method: 'get',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Token '+token,        // Django Rest Knox Token authentication format
        },
    };

    // Async function to retrieve user list with token authentication
    try {
        const response = await fetch("/rally/listusers", req1);

        // If fetch request successful, return list of users
        if(response.ok) {

            const result = await response.json();

            dispatch({
                type: LIST_USERS,
                payload: result,
            });
        }         
        // Else, deny request
        else {

            // Will need additional work here for redirecting on permissions vs failed to login

            // Clear storage of invalid/rejected token
            // localStorage.clear();

            dispatch({
                type: RETRIEVAL_FAILED,
            });
        }
    }    
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        dispatch({
            type: RETRIEVAL_FAILED,
        });
    }

}


// Basic error parsing
export const getErrors = () => {

}