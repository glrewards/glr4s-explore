import {FETCH_CATEGORIES} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return action.payload || false;
        default:
            return state;
    }
}
