import {
  INVALIDATE_CABINET,
  REQUEST_CABINET,
  RECEIVE_CABINET
} from "../actions/rewardActions";

function cabinet(
    state = {
      isFetching: false,
      didInvalidate: false,
      cabDetail: {}
    },
    action
) {
  switch (action.type) {
    case INVALIDATE_CABINET:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_CABINET:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CABINET:
      console.log("ACTION: ",action);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        centre: action.centre,
        cabDetail: action.payload,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
export default cabinet;