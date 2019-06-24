import {SET_PROGRESS_BAR} from "../actions/types";
import {SET_STUDENT_PAGES} from "../actions/types";

export const ui = (state = {}, action) => {
    console.log(action);
    switch (action.type) {
        case SET_PROGRESS_BAR:
            return Object.assign({}, state, { progressBarStatus: action.isOpen });
        case SET_STUDENT_PAGES:
            return Object.assign({},state, action.payload);
        default:
            return state;
    }
};
export default ui;
