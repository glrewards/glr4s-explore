import { FETCH_USER } from "../actions/types";
import {START_LOGIN} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case START_LOGIN:
      console.log("action payload: ",action.payload);
      return action.payload || false;
    default:
      return state;
  }
}
