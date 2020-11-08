export const RELATED_USER_SELECTED = 'RELATED_USER_SELECTED'

export function selectUser(userId) {
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
