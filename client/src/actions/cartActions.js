//types

export const ADD_LINE = 'ADD_LINE'
export const REMOVE_LINE = 'REMOVE_LINE'
export const AMEND_LINE = 'AMEND_LINE'


/*
 * action creators
 */

export function addLine(student,productId, variantId, quantity) {
    return { type: ADD_LINE, student, productId, variantId, quantity }
}

export function amendLine(index) {
    return { type: AMEND_LINE, index }
}

export function removeLine(index){
    return {type: REMOVE_LINE, index}
}

