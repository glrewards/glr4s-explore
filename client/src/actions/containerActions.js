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

export function itemClicked(itemKey){
    return {
        type: CONTAINER_MEMBER_CLICKED,
        payload: itemKey
    };

}
