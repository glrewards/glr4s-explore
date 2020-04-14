//types

export const ADD_LINE = 'ADD_LINE' //could include a duplicate so we really only want to increase the count
export const REMOVE_LINE = 'REMOVE_LINE'
export const AMEND_LINE = 'AMEND_LINE' //this should be triggered only by changing the quantity
export const DELETE_ALL_LINES = 'DELETE_ALL_LINES'


/*
 * action creators
 */

export function addLine(student,rewardId, productTitle, variantId, quantity,glrpoints, img) {
    return { type: ADD_LINE, student, rewardId, productTitle, variantId, quantity, glrpoints,img }
}

export function amendLine(rewardId, variantId, quantity, index) {
    return { type: AMEND_LINE, rewardId, variantId, quantity, index }
}

export function removeLine(index){
    return {type: REMOVE_LINE, index}
}

export function deleteAllLines() {
    return {type: DELETE_ALL_LINES}
}
