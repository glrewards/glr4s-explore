import {SELECT_SCHOOL}from '../actions/XODSchoolActions';

const initialState = null;

export default function (state = initialState, action) {
    switch (action.type) {
        case SELECT_SCHOOL:
            return action.schoolId||false;
        default:
            return state
    }
}

