import {FETCH_XOD_ACHIEVEMENTS} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_XOD_ACHIEVEMENTS:
            return action.payload || false;
        default:
            return state;
    }
}
