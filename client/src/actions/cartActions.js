//types

export const ADD_LINE = 'ADD_LINE'
export const REMOVE_LINE = 'REMOVE_LINE'
export const AMEND_LINE = 'AMEND_LINE'
export const DELETE_ALL_LINES = 'DELETE_ALL_LINES'


/*
 * action creators
 */

export function addLine(student,productId, productTitle, variantId, quantity,glrpoints, img) {
    return { type: ADD_LINE, student, productId, productTitle, variantId, quantity, glrpoints,img }
}

export function amendLine(index) {
    return { type: AMEND_LINE, index }
}

export function removeLine(index){
    return {type: REMOVE_LINE, index}
}

export function deleteAllLines() {
    return {type: DELETE_ALL_LINES}
}
