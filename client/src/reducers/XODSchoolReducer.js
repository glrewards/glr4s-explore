import {SELECT_SCHOOL}from '../actions/XODSchoolActions';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_SCHOOL:
            console.log("action payload: ", action.schoolId);
            return action.schoolId||false;
        default:
            return state
    }
}

