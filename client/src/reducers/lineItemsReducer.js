import {FETCH_LINEITEMS,SAVE_LINEITEMS} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_LINEITEMS:
            return action.payload || false;
        case SAVE_LINEITEMS:
            return action.payload || false;
        default:
            return state;
    }
}
