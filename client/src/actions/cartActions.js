//types

import axios from "axios";
export const ADD_LINE = 'ADD_LINE' //could include a duplicate so we really only want to increase the count
export const REMOVE_LINE = 'REMOVE_LINE'
export const AMEND_LINE = 'AMEND_LINE' //this should be triggered only by changing the quantity
export const DELETE_ALL_LINES = 'DELETE_ALL_LINES'

/*
 * action creators
 */


export function addLine(user,rewardId, productTitle, variantId, quantity,glrpoints, img) {
    return { type: ADD_LINE, user, rewardId, productTitle, variantId, quantity, glrpoints,img }
}

export function amendLine(index, quantity) {
    return { type: AMEND_LINE,  index, quantity }
}

export function removeLine(index){
    return {type: REMOVE_LINE, index}
}

export function deleteAllLines() {
    return {type: DELETE_ALL_LINES}
}
