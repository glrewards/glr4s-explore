import {FETCH_ALL_XOD_STUDENTS} from "../actions/types";

//default state is an empty array
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_XOD_STUDENTS:
            let lastCursor = null;
            if(action.payload) {
                lastCursor = getCursor(action.payload);
            }
            return lastCursor;

        //return action.payload || false;

        default:
            return state;
    }
}

function getCursor(students) {
    if (!students) {
        return;
    }
    let val = students[students.length - 1];
    return val.xodstudent._id;
}
