import axios from "axios";

export const REQUEST_LINEITEMS = 'REQUEST_LINEITEMS'
export const RECEIVE_LINEITEMS = 'RECEIVED_LINEITEMS'

function requestLineItems(centre,studentId){
    return{
        type: REQUEST_LINEITEMS,
        centre,
        studentId
    }
}

function receiveLineItems(centre,studentId,json){
    return {
        type: RECEIVE_LINEITEMS,
        centre,
        studentId,
        payload: json,
        receivedAt: Date.now()
    };
}
export const REQUEST_ORDER = "request_order";
function requestOrder(centre){
    return{
        type: REQUEST_ORDER,
        centre
    }
}

export const RECEIVE_ORDER = "receive_order";
function receiveOrder(centre, json) {
    //console.log(centre,json);
    return {
        type: RECEIVE_ORDER,
        centre,
        payload: json,
        receivedAt: Date.now()
    };
}


export const INVALIDATE_ORDER = "invalidate_order";
export function invalidateOrder(centre) {
    return {
        type: INVALIDATE_ORDER,
        centre
    };
}
export const fetchOrder = (centre) => async dispatch =>{
    let url = "api/orders/" + centre;
    dispatch(requestOrder(centre)); //update state to say we are fetching cabinet
    const res = await axios.get(url);
    //console.log("response data: ", res.data);
    dispatch(receiveOrder(centre,res.data));
}

export const fetchLineItems = (centre,studentId) => async dispatch =>{
    //console.log(centre, studentId);
    let url = "api/orders/" + centre + "/" + studentId;
    dispatch(requestLineItems(centre,studentId)); //update state to say we are fetching cabinet
    const res = await axios.get(url);
    dispatch(receiveLineItems(centre,studentId,res.data));
}