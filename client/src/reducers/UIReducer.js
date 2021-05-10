import { SET_PROGRESS_BAR } from "../actions/types";
import { SET_STUDENT_PAGES } from "../actions/types";
import {
  MASTER_ORDER_SELECTED,
  RELATED_USER_SELECTED,
  SEARCH
} from "../actions/UIActions";
import { SET_ORDER_USER } from "../actions/types";

export const ui = (state = {}, action) => {
  switch (action.type) {
    case SET_ORDER_USER:
      console.log("SET_ORDER_USER: reducer: " + action.payload);
      return {
        ...state,
        ...state.ui,
        orderuser: action.payload
      };
    case SET_PROGRESS_BAR:
      return Object.assign({}, state, { progressBarStatus: action.isOpen });
    case SET_STUDENT_PAGES:
      return Object.assign({}, state, action.payload);
    case RELATED_USER_SELECTED:
      //console.log(action.payload);
      return Object.assign({}, state, {
        orderuser: action.payload.member,
        selectedmember: action.payload.userId
      });
    case MASTER_ORDER_SELECTED:
      //console.log("UIReducer: MASTER_ORDER_SELECTED: " + action.payload);
      return Object.assign({}, state, action.payload);
    case SEARCH:
      if (action.payload.value === "") {
          //we dont want the attribute
          return{
              ...state,
              searchParams: {
                  [action.payload.field]: null
              }
          }
      } else {
        return {
          ...state,
          searchParams: {
            ...state.searchParams,
            [action.payload.field]: action.payload.value
          }
        };
      }
    default:
      return state;
  }
};
export default ui;
