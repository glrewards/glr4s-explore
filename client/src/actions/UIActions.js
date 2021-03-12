export const RELATED_USER_SELECTED = 'RELATED_USER_SELECTED';
export const MASTER_ORDER_SELECTED = 'MASTER_ORDER_SELECTED';
export const SEARCH_CENTRE = 'SEARCH_CENTRE';

export function selectUser(userId) {
    console.log("action: selectUser()");
    return (dispatch, getState) => {
        //using thunk and getState so that I can grab the member data and populate the ordermember area
        //with this data in the reducer. REMEMBER - I you cannot access other parts of the state from a given
        //reducer where we have used combineReducers
        const {members} = getState();
        const member = members.find( (item) => {
            return item._id === userId;
        })
        const payload = {member, userId};
        dispatch({type: RELATED_USER_SELECTED, payload});
    }
}
//fired off as soon as a user begins to type into the Input field
export function searchOrders(fieldId, text) {
    let payload = {field: fieldId, value: text};
    return (dispatch) => {
        dispatch({
            type: SEARCH_CENTRE,
            payload: payload
        });
    }
}

export function selectOrder(orderId) {
    console.log("action: selectOrder()");
    return (dispatch, getState) => {
        const orders = getState().order.GLROrderList;
        const orderIndex = orders.findIndex((order) => {
            return order._id === orderId;
        });
        const payload = {masterOrderIndex: orderIndex, masterOrderId: orderId};
        dispatch({type: MASTER_ORDER_SELECTED, payload});
    }
}
