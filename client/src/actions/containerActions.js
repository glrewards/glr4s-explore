import axios from "axios";
import {RECEIVE_ORDER, REQUEST_ORDER} from "./orderActions";

export const CONTAINER_REQUEST_MEMBERS = 'CONTAINER_REQUEST_MEMBERS ';
export const CONTAINER_RECEIVED_MEMBERS  = 'CONTAINER_RECEIVED_MEMBERS ';
export const CONTAINER_MEMBER_CLICKED = 'CONTAINER_MEMBER_CLICKED';


function requestMembers(){
    return{
        type: CONTAINER_REQUEST_MEMBERS
    }
}

function receiveMembers(json) {
    return {
        type: CONTAINER_RECEIVED_MEMBERS,
        payload: json,
        receivedAt: Date.now()
    };
}
export const fetchMembers = () => async dispatch =>{
    let url = "api/members/" ;
    dispatch(requestMembers()); //update state to say we are fetching cabinet
    const res = await axios.get(url);
    //console.log("response data: ", res.data);
    dispatch(receiveMembers(res.data));
}
