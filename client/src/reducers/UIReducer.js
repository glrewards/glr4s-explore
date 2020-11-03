import {SET_PROGRESS_BAR} from "../actions/types";
import {SET_STUDENT_PAGES} from "../actions/types";
import {RELATED_USER_SELECTED} from "../actions/UIActions";

export const ui = (state = {}, action) => {
    switch (action.type) {
        case SET_PROGRESS_BAR:
            return Object.assign({}, state, { progressBarStatus: action.isOpen });
        case SET_STUDENT_PAGES:
            return Object.assign({},state, action.payload);
        case RELATED_USER_SELECTED:
            console.log(action);
            return {
                ...state,
            selectedmember: action.userId
            };
        default:
            return state;
    }
};
export default ui;
