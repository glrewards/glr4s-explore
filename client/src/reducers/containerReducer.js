import {CONTAINER_RECEIVED_MEMBERS, CONTAINER_REQUEST_MEMBERS, CONTAINER_MEMBER_CLICKED} from "../actions/containerActions";

export default function(state = null, action) {
    switch (action.type) {
        case CONTAINER_REQUEST_MEMBERS:
            return action.payload || false;
        default:
            return state;
    }
}
