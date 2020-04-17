import {
  REQUEST_ORDER,
  INVALIDATE_ORDER,
  RECEIVE_ORDER,
  REQUEST_LINEITEMS,
  RECEIVE_LINEITEMS
} from "../actions/orderActions";

function order(
  state = {
    isFetching: false,
    didInvalidate: false,
    orderDetail: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_LINEITEMS: //a member is looking at their itmes
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_LINEITEMS: // we received a members list of items
        console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        centre: action.centre,
        orderDetail: action.payload,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_ORDER:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_ORDER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        centre: action.centre,
        orderDetail: action.payload,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}
export default order;
