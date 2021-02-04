import {
    ADD_LINE,
    AMEND_LINE,
    REMOVE_LINE,
    DELETE_ALL_LINES,
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
                        _student: action.user._student._id,
                        memberFirstName: action.user._student.firstName,
                        memberLastName: action.user._student.lastName,
                        _rewardId: action.rewardId,
                        productTitle: action.productTitle,
                        variantId: action.variantId.toString(),
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
            console.log(action);
            let cart = state.cart.map((line, index) => {
                if (index === action.index) {
                    return Object.assign({}, line, {
                        quantity: action.quantity //quantity has been amended by the action so....
                    })
                }
                return line;
            });
            return {cart: cart}
        default:
            return state
    }
}

