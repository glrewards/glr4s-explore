import {
  ADMIN_LINE_MARKED_DELETE,
  ADMIN_LINE_UNMARKED_DELETE,
  INVALIDATE_ORDER,
  LINE_MARKED_DELETE,
  LINE_UNMARKED_DELETE,
  RECEIVE_LINEITEMS,
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
    adminDeletes:[],
    orderDetail: {}
  },
  action
) {
  switch (action.type) {
    case RESET_DELETED:
      return Object.assign({},state,{
        deletes:[],
        adminDeletes:[]
      });
    case ADMIN_LINE_MARKED_DELETE:
      //just need to add it because we remove it if unchecked
      return Object.assign({}, state, {
        adminDeletes: [...state.adminDeletes, action.lineId]
      });
    case ADMIN_LINE_UNMARKED_DELETE:
      let adminIndex = state.adminDeletes.indexOf(action.lineId);
      console.log (adminIndex)
      if (index > -1) {
        return Object.assign({}, state, {
          adminDeletes: [...state.adminDeletes.slice(0, adminIndex),
            ...state.adminDeletes.slice(adminIndex + 1)
          ],
        });
      }else{
        return state;
      }
    case LINE_MARKED_DELETE:
      //just need to add it because we remove it if unchecked
      return Object.assign({}, state, {
        deletes: [...state.deletes, action.lineId]
      });
    case LINE_UNMARKED_DELETE:
      let index = state.deletes.indexOf(action.lineId);
      console.log (index)
      if (index > -1) {
        return Object.assign({}, state, {
          deletes: [...state.deletes.slice(0, index),
            ...state.deletes.slice(index + 1)
          ],
        });
      }else{
        return state;
      }
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
