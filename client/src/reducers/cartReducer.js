import { combineReducers } from 'redux';
import {
    ADD_LINE,
    AMEND_LINE,
    REMOVE_LINE
} from '../actions/cartActions'

const initialState = {
   cart: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LINE:
            return Object.assign({}, state, {
                cart: [
                    ...state.cart,
                    {
                        student: action.student,
                        productId: action.productId,
                        variantId: action.variantId,
                        quantity: action.quantity
                    }

                ]
            })
        case AMEND_LINE:
            return state.map((amendedLine, index) => {
                if (index === action.index) {
                    return Object.assign({}, amendedLine, {
                        //quantity: line.quantity
                    })
                }
                return amendedLine;
            })
        default:
            return state
    }
}

