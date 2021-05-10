import axios from "axios";
import {RECEIVE_ORDER, REQUEST_ORDER} from "./orderActions";
import {SEARCH} from "./UIActions";

export const CONTAINER_REQUEST_MEMBERS = 'CONTAINER_REQUEST_MEMBERS ';
export const CONTAINER_RECEIVED_MEMBERS  = 'CONTAINER_RECEIVED_MEMBERS ';
export const CONTAINER_MEMBER_CLICKED = 'CONTAINER_MEMBER_CLICKED';
export const CONTAINER_ADD_CLICKED = 'CONTAINER_ADD_CLICKED';
export const CONTAINER_DEL_CLICKED = 'CONTAINER_DEL_CLICKED';
export const CONTAINER_ADD_OWNER_CLICKED = 'CONTAINER_ADD_OWNER_CLICKED';
export const CONTAINER_DEL_OWNER_CLICKED = 'CONTAINER_DEL_OWNER_CLICKED';
export const CONTAINER_FIELD_CHANGED = 'CONTAINER_FIELD_CHANGED';

export function setContainerFields(fieldId, text) {
    let payload = {field: fieldId, value: text};
    return (dispatch) => {
        dispatch({
            type: CONTAINER_FIELD_CHANGED,
            payload: payload
        });
    }
}

function requestMembers(){
    return{
        type: CONTAINER_REQUEST_MEMBERS
    }
}

export function addOwners(){
    return{
        type: CONTAINER_ADD_OWNER_CLICKED
    }
}

export function addMembers(){
    return{
        type: CONTAINER_ADD_CLICKED
    }
}
export function delMembers(){
    return {
        type: CONTAINER_DEL_CLICKED
    }
}

export function delOwners(){
    return {
        type: CONTAINER_DEL_OWNER_CLICKED
    }
}
function receiveMembers(json) {
    return {
        type: CONTAINER_RECEIVED_MEMBERS,
        payload: json,
        receivedAt: Date.now()
    };
}
export const fetchMembers = () => async (dispatch,getState) =>{
    let url = "api/user/" ;
    const {auth} = getState();
    let params = getState().ui.searchParams;
    //params might not exist in which case we need to lust add the centre from Auth
    //if they do exist we still need to add the centre from auth state.
    if(!params) params = {};
    params['centreId'] = auth._learningCentreId;

    let options = {
        params:params
    }
    dispatch(requestMembers()); //update state to say we are fetching cabinet
    try {
        const res = await axios.get(url, options);
        console.log("response data: ", res.data);
        dispatch(receiveMembers(res.data));
    }catch (e){
        console.log(e.message);
        //trigger the reducer to clear the state
        dispatch(receiveMembers([]));
    }
}

export const  saveContainer = () => async (dispatch, getState) =>{
    let url = "api/container/";
    // build a valid request body
    const memberIds = getState().container.group.map(member => {
        return member._id;
    });
    const ownerIds = getState().container.owners.map(owner =>{
        return owner._id;
    })
    const reqBody = {
        name: getState().container.name,
        type: getState().container.type,
        members: memberIds,
        owners: ownerIds
    }
    try {
        const res = await axios.post(url,reqBody);
        console.log("response data: ", res.data);
    }catch (e){
        console.log(e.message);
    }
}

export function itemClicked(target){
    return {
        type: CONTAINER_MEMBER_CLICKED,
        payload: {itemKey: target.id,
        collection: target.parentElement.id}
    };

}
