import axios from "axios";
import {FETCH_XOD_STUDENT} from "./types";
import {RECEIVED_LINEITEMS, RECEIVED_LINEITEMS_NONE} from "./orderActions";

export const REQUEST_RELATED = 'REQUEST_RELATED';
export const REQUEST_USER = 'REQUEST_USER';

export const RECEIVED_RELATED = 'RECEIVED_RELATED';
export const RECEIVED_USER = 'RECEIVED_USER';

export const REQUEST_RELATED_ERROR = 'REQUEST_RELATED_ERROR';
export const REQUEST_USER_ERROR = 'REQUEST_USER_ERROR';


//a new way to get at user data that is not wrapped up with the authentication actions
function receiveUser(centre,studentId,json){
    return {
        type: RECEIVED_USER,
        payload: json,
        receivedAt: Date.now()
    };
}
function receiveUserError(userId,code){
    return {
        type: REQUEST_USER_ERROR,
        userId,
        payload: code,
        receivedAt: Date.now()
    };
}

function receiveRelated(json){
    return {
        type: RECEIVED_RELATED,
        payload: json,
        receivedAt: Date.now()
    };
}

function receiveRelatedError(userId,code){
    return {
        type: REQUEST_RELATED_ERROR,
        userId,
        payload: code,
        receivedAt: Date.now()
    };
}

export const fetchMember = (userId) => async dispatch => {
    const url = "/api/user/" + userId;
    try {
        const res = await axios.get(url);
        //console.log(res.data);
        dispatch(receiveUser(res.data));
    }catch(e){
        //console.log("error",e);
        dispatch(receiveUserError(userId,e.code));
    }
};

export const fetchRelatedMembers = (userId) => async dispatch => {
    const url = "/api/user/related/" + userId;
    try{
        const res = await axios.get(url);
        console.log(res.data);
        dispatch( receiveRelated(res.data));

    }catch(e){
        dispatch(receiveRelatedError(userId,e.code));
    }
};
