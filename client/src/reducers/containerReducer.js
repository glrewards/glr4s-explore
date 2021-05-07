import {CONTAINER_RECEIVED_MEMBERS, CONTAINER_REQUEST_MEMBERS, CONTAINER_MEMBER_CLICKED} from "../actions/containerActions";
import order from "./orderReducer";

 function container(state = {
    isFetching: false,
    members: []
}, action) {
    switch (action.type) {
        case CONTAINER_REQUEST_MEMBERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CONTAINER_RECEIVED_MEMBERS:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}

export default container;
