import { RECEIVED_RELATED, REQUEST_RELATED_ERROR, REQUEST_RELATED} from "../actions/memberActions";

export default function(state = null, action) {
    switch (action.type) {
        case RECEIVED_RELATED:
            console.log("received related need to store data ",action);
            return action.payload || false;
        default:
            return state;
    }
}
