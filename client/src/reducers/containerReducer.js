import {
  CONTAINER_RECEIVED_MEMBERS,
  CONTAINER_REQUEST_MEMBERS,
  CONTAINER_MEMBER_CLICKED,
  CONTAINER_ADD_CLICKED,
  CONTAINER_DEL_CLICKED,
  CONTAINER_DEL_OWNER_CLICKED,
  CONTAINER_ADD_OWNER_CLICKED,
  CONTAINER_FIELD_CHANGED,
  CONTAINER_SAVED, CONTAINER_SAVING
} from "../actions/containerActions";


function container(
  state = {
    isFetching: false,
    saved: false,
    members: [],
    group: [],
    owners: []
  },
  action
) {
  let group = [];
  let remainingGroup = [];
  let remainingMembers = [];
  let selectedGroup = [];
  let selectedMembers = [];
  let mainList = [];
  switch (action.type) {
    case CONTAINER_SAVING:
      return Object.assign({}, state, {
        saved: 'nok',
        saving: true
      });
    case CONTAINER_SAVED:
      // we want to indicate a successful save
      return Object.assign({}, state, {
        saved: action.payload,
        saving: false
      });
    case CONTAINER_FIELD_CHANGED:
      if (action.payload.value === "") {
        //we dont want the attribute
        return Object.assign({}, state, { [action.payload.field]: null });
      } else {
        return Object.assign({}, state, {
          [action.payload.field]: action.payload.value
        });
      }
    case CONTAINER_DEL_OWNER_CLICKED:
      //this is the reverse pf the ADD_CLICKED
      remainingGroup = state.owners.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      selectedGroup = state.owners.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      mainList = state.members.concat(selectedGroup);
      return Object.assign({}, state, {
        owners: remainingGroup,
        members: mainList
      });

    case CONTAINER_DEL_CLICKED:
      //this is the reverse pf the ADD_CLICKED
      remainingGroup = state.group.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      selectedGroup = state.group.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      mainList = state.members.concat(selectedGroup);
      return Object.assign({}, state, {
        group: remainingGroup,
        members: mainList
      });
    case CONTAINER_ADD_OWNER_CLICKED:
      // remove the selected Items from members array and add them to the group list.
      // reset the selected attribute at the same time.
      remainingMembers = state.members.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      selectedMembers = state.members.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      group = state.owners.concat(selectedMembers);
      return Object.assign({}, state, {
        owners: group,
        members: remainingMembers
      });
    case CONTAINER_ADD_CLICKED:
      // remove the selected Items from members array and add them to the group list.
      // reset the selected attribute at the same time.
      remainingMembers = state.members.filter(member => {
        if (!member.selected) {
          return true;
        }
      });
      selectedMembers = state.members.filter(member => {
        if (member.selected) {
          member.selected = false;
          return true;
        }
      });
      group = state.group.concat(selectedMembers);
      return Object.assign({}, state, {
        group: group,
        members: remainingMembers
      });

    case CONTAINER_MEMBER_CLICKED:
      //find the item by the provided key
      // being lazy here - will check both user lists
      console.log(action.payload);
      const items = state[action.payload.collection.toLowerCase()];
      console.log(items);
      if (items) {
        const index = items.findIndex(item => {
          if (item.username === action.payload.itemKey) {
            item.selected = !item.selected;
            return true;
          }
        });
        //items[index].selected = !items[index].selected;
      }
      let newState = {};
      newState[action.payload.collection] = items;
      console.log(newState);
      return Object.assign({}, state, newState);
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
