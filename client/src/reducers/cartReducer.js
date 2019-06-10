import { combineReducers } from 'redux';
import {
    ADD_LINE,
    AMEND_LINE,
    REMOVE_LINE,
    DELETE_ALL_LINES
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
                        _student: action.student._id,
                        productId: action.productId,
                        productTitle: action.productTitle,
                        variantId: action.variantId,
                        quantity: action.quantity,
                        glrpoints: action.glrpoints,
                        img: action.img

                    }

                ]
            })
        case DELETE_ALL_LINES:
            return Object.assign({},state,{
                cart:[],
                lineItems: state.lineItems
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

