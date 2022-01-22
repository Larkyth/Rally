import { combineReducers } from "redux";

// Import slice reducers to be combined
import rallyusers from "./rallyusers";
import rallymeetings from "./rallymeetings";


export default combineReducers({
    rallyusers,
    rallymeetings
});