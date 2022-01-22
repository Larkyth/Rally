import {
    MEETING_CREATED,
    MEET_CREATE_FAILED,
    RETRIEVED_DATA,
    RETRIEVAL_FAILED,
} from "../actions/types.js";


// Create meeting instance server-side (post request)
export const createMeeting = (title, agenda, start_date, end_date, creator, owners) => async dispatch => {

    // Set up POST request
    const token = localStorage.getItem("Token")
    const userId = creator.id

    // Grab owner ids for easy backend processing
    const ownerIds = []
    owners.forEach(element => {
        ownerIds.push(element.value.user.id)
    });

    const requestSetup = {
        method: 'post',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Token '+token,        // Django Rest Knox Token authentication format
        },
        body: JSON.stringify({
            title: title,
            agenda: agenda,
            start_date: start_date,
            end_date: end_date,
            creator: userId,
            owners: ownerIds,
        }),
    };
    console.log(requestSetup);

    try {
        const response = await fetch("/rally/createmeeting", requestSetup);

        // If meeting created
        if(response.ok) {

            const result = await response.json();
            console.log(result);

            dispatch({
                type: MEETING_CREATED,
                payload: result,
            });
        }         
        // Else, return errors
        else {

            // Will need additional work here for redirecting on permissions vs failed to login

            const result = await response.json();
            console.log(result);

            dispatch({
                type: MEET_CREATE_FAILED,
                payload: result,
            });
        }
    }    
    // Catch fetch errors - not the same as a bad request
    catch(error) {
        
        // const result = await error.json();
        // console.log(result);

        console.log(error)

        dispatch({
            type: MEET_CREATE_FAILED,
            // payload: result,
        });
    }
    
}