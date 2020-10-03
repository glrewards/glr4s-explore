import axios from "axios";
import {fetchUser} from "./index";
import {DELETE_ALL_LINES} from "./cartActions";

export const REQUEST_LINEITEMS = 'REQUEST_LINEITEMS'
export const RECEIVED_LINEITEMS = 'RECEIVED_LINEITEMS'
export const RECEIVED_LINEITEMS_NONE = "RECEIVED_LIEITEMS_NONE"
export const LINE_MARKED_DELETE = 'LINE_MARKED_DELETE'
export const LINE_UNMARKED_DELETE = 'LINE_UNMARKED_DELETE'
export const RESET_DELETED = 'LINES_DELETED'
export const ADMIN_LINE_MARKED_DELETE = 'ADMIN_LINE_MARKED_DELETE'
export const ADMIN_LINE_UNMARKED_DELETE = 'ADMIN_LINE_UNMARKED_DELETE'

export function resetDeleted(){
    return{type: RESET_DELETED}
}

//checking to see if a member or admin deleted the item
//admins can delete for any kid so we need to do something different here
export function lineItemsDelete(studentId,checked,lineId){
    console.log("lineItemsDelete student: ", studentId);
 if (studentId) {
     if (checked) {
         return {
             type: ADMIN_LINE_MARKED_DELETE,
             studentId,
             checked,
             lineId
         }
     } else {
         return {
             type: ADMIN_LINE_UNMARKED_DELETE,
             studentId,
             checked,
             lineId
         }
     }
 }else{
     if (checked) {
         return {
             type: LINE_MARKED_DELETE,
             checked,
             lineId
         }
     } else {
         return {
             type: LINE_UNMARKED_DELETE,
             checked,
             lineId
         }
     }

 }

}
function requestLineItems(centre,studentId){
    return{
        type: REQUEST_LINEITEMS,
        centre,
        studentId
    }
}
function receiveLineItems(centre,studentId,json){
    return {
        type: RECEIVED_LINEITEMS,
        centre,
        studentId,
        payload: json,
        receivedAt: Date.now()
    };
}
function receiveLineItemsError(centre,studentId,code){
    return {
        type: RECEIVED_LINEITEMS_NONE,
        centre,
        studentId,
        payload: code,
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
    try {
        const res = await axios.get(url);
        console.log(res.data);
        dispatch(receiveLineItems(centre, studentId, res.data));
    }catch(e){
        console.log("error",e);
        dispatch(receiveLineItemsError(centre,studentId,e.code));
    }
}

export const deleteLineItems = (centre,studentId,items) => async dispatch => {
    if(studentId) {
        let url = "api/orders/deletelines/" + centre + "/" + studentId;
        const res = await axios.put(url, items);
        dispatch(resetDeleted());
        dispatch(fetchLineItems(centre, studentId));
        await dispatch(fetchUser());
    }else{
        // this means it is an admin delete and we have to group all the deletes
        //by student ID and then submit each set for each student
        //TODO: this first cut is calling for each single delete meaning a lot of
        // async colls! implement better grouping logic
         for (const item of items) {
            let studentId = item.studentId;
            let items = [item.lineId];
            let url = "api/orders/deletelines/" + centre + "/" + studentId;
            console.log(url);
            const res = await axios.put(url, items);
            dispatch(resetDeleted());
            dispatch(fetchOrder(centre));
        }
         await dispatch(fetchUser());
    }
}

export const submitLineItems = (reqBody, history) => async dispatch => {
    try {
        const res = await axios.post("/api/orders", reqBody);
        await dispatch(fetchUser());
        await dispatch({type: DELETE_ALL_LINES}); //actually we clear the the local cart and then can populate the lineitems
        history.push("/cabinet");
    }catch (e) {
        console.log(e);
    }
};


