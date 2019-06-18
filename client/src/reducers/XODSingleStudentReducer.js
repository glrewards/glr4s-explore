import {FETCH_XOD_STUDENT} from "../actions/types";

//default state is an empty array
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_XOD_STUDENT:
            return action.payload || false;
        default:
            return state;
    }
}
