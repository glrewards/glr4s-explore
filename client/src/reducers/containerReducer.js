import {
  CONTAINER_RECEIVED_MEMBERS,
  CONTAINER_REQUEST_MEMBERS,
  CONTAINER_MEMBER_CLICKED,
  CONTAINER_ADD_CLICKED,
  CONTAINER_DEL_CLICKED,
    CONTAINER_FIELD_CHANGED
} from "../actions/containerActions";

import order from "./orderReducer";

function container(
  state = {
    isFetching: false,
    members: [],
    group: []
  },
  action
) {
  switch (action.type) {
    case CONTAINER_FIELD_CHANGED:
      if (action.payload.value === "") {
        //we dont want the attribute
        return Object.assign({},state,{[action.payload.field]: null });
      } else {
        return Object.assign({},state,{[action.payload.field]: action.payload.value });

      }
    case CONTAINER_DEL_CLICKED:
      //this is the reverse pf the ADD_CLICKED
      let remainingGroup = state.group.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      let selectedGroup = state.group.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      let mainList = state.members.concat(selectedGroup);
      return Object.assign({}, state, {
        group: remainingGroup,
        members: mainList
      });

    case CONTAINER_ADD_CLICKED:
      // remove the selected Items from members array and add them to the group list.
      // reset the selected attribute at the same time.
      let remainingMembers = state.members.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      let selectedMembers = state.members.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      let group = state.group.concat(selectedMembers);
      return Object.assign({}, state, {
        group: group,
        members: remainingMembers
      });

    case CONTAINER_MEMBER_CLICKED:
      //find the item by the provided key
      // being lazy here - will check both user lists
      const items = state.members;
      if (items) {
        const index = items.findIndex(item => {
          if (item.username === action.payload) {
            item.selected = !item.selected;
            return true;
          }
        });
        //items[index].selected = !items[index].selected;
      }
      const itemsg = state.group;
      if (itemsg) {
        const indexg = itemsg.findIndex(item => {
          if (item.username === action.payload) {
            item.selected = !item.selected;
            return true;
          }
        });
        //itemsg[indexg].selected = !itemsg[indexg].selected;
      }
      return Object.assign({}, state, { members: items, group: itemsg });
    case CONTAINER_REQUEST_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case CONTAINER_RECEIVED_MEMBERS:
      //loop through the payload and add a selected flag to each member
      let members = action.payload;
      members.forEach(member => {
        member["selected"] = false;
      });
      return Object.assign({}, state, {
        isFetching: false,
        members: members,
        group: []
      });
    default:
      return state;
  }
}

export default container;
