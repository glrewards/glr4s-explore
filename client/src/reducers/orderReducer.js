import {
  ADMIN_LINE_MARKED_DELETE,
  ADMIN_LINE_UNMARKED_DELETE,
  INVALIDATE_ORDER,
  LINE_MARKED_DELETE,
  LINE_UNMARKED_DELETE,
  RECEIVED_LINEITEMS,
    RECEIVED_LINEITEMS_NONE,
  RECEIVE_ORDER,
  REQUEST_LINEITEMS,
  REQUEST_ORDER,
  RESET_DELETED
} from "../actions/orderActions";

function order(
  state = {
    isFetching: false,
    didInvalidate: false,
    deletes: [],
    adminDeletes: [],
    orderDetail: {}
  },
  action
) {
  switch (action.type) {
    case RESET_DELETED:
      return Object.assign({}, state, {
        deletes: [],
        adminDeletes: []
      });
    case ADMIN_LINE_MARKED_DELETE:
      //just need to add it because we remove it if unchecked
      return Object.assign({}, state, {
        adminDeletes: [
          ...state.adminDeletes,
          { lineId: action.lineId, studentId: action.studentId }
        ]
      });
    case ADMIN_LINE_UNMARKED_DELETE:
      let adminIndex = state.adminDeletes.findIndex(
        item =>
          item.lineId === action.lineId && item.studentId === action.studentId
      );
      console.log(adminIndex);
      if (adminIndex > -1) {
        return Object.assign({}, state, {
          adminDeletes: [
            ...state.adminDeletes.slice(0, adminIndex),
            ...state.adminDeletes.slice(adminIndex + 1)
          ]
        });
      } else {
        return state;
      }
    case LINE_MARKED_DELETE:
      //just need to add it because we remove it if unchecked
      return Object.assign({}, state, {
        deletes: [...state.deletes, action.lineId]
      });
    case LINE_UNMARKED_DELETE:
      let index = state.deletes.indexOf(action.lineId);
      console.log(index);
      if (index > -1) {
        return Object.assign({}, state, {
          deletes: [
            ...state.deletes.slice(0, index),
            ...state.deletes.slice(index + 1)
          ]
        });
      } else {
        return state;
      }
    case REQUEST_LINEITEMS: //a member is looking at their items
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVED_LINEITEMS: // we received a members list of items
      console.log(action);
      //this payload is only an array of line items
      //previous but set order details to this array
      //it needs to be orderDetail.lineItems

      const orders = action.payload;

      return Object.assign({}, state, {
        isFetching: false,
        orderExists: true,
        didInvalidate: false,
        centre: action.centre,
        orders: orders,
        lastUpdated: action.receivedAt
      });
    case RECEIVED_LINEITEMS_NONE:
      return Object.assign({},state,{orderExists:false, isFetching: false});
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
