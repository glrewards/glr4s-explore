import {
  CONTAINER_RECEIVED_MEMBERS,
  CONTAINER_REQUEST_MEMBERS,
  CONTAINER_MEMBER_CLICKED
} from "../actions/containerActions";

import order from "./orderReducer";

function container(
  state = {
    isFetching: false,
    members: []
  },
  action
) {
  switch (action.type) {
      case CONTAINER_MEMBER_CLICKED:
          console.log(action.payload);
          //find the item by the provided key
          const items = state.members;
          const index = items.findIndex( item => {
              if (item.username === action.payload){
                  return true;
              }
          });
          console.log(index);
          items[index].selected = !items[index].selected;
          return Object.assign({},state,items);
    case CONTAINER_REQUEST_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case CONTAINER_RECEIVED_MEMBERS:
        //loop through the payload and add a selected flag to each member
        let members = action.payload;
        members.forEach( member => {
            member['selected'] = false;
        });
      return Object.assign({}, state, {
        isFetching: false,
        members: members
      });
    default:
      return state;
  }
}

export default container;
