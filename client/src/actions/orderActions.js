import axios from "axios";

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
    const res = await axios.get(url, options);
    //console.log("response data: ", res.data);
    dispatch(receiveOrder(centre,res.data));
}