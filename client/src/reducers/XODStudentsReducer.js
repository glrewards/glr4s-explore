import {FETCH_ALL_XOD_STUDENTS} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_XOD_STUDENTS:
            console.log(action.payload);
            return action.payload || false;

        default:
            return state;
    }
}
