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
                        rewardId: action.rewardtId,
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
        case REMOVE_LINE:
            //TODO: replace this place holder with proper logic
            return state;
        case AMEND_LINE:
            return state.map((line, index) => {
                if (index === action.index) {
                    return Object.assign({}, line, {
                        quantity: action.quantity //quantity has been amended by the action so....
                    })
                }
                return line;
            })
        default:
            return state
    }
}

