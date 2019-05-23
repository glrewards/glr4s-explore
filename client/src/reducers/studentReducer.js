import {FETCH_ALL_STUDENTS} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_STUDENTS:
            return action.payload || false;
        default:
            return state;
    }
}
