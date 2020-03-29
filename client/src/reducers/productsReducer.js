import {FETCH_PRODUCTS} from "../actions/types";

/*
//default state is an empty array
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload || false;
        default:
            return state;
    }
}
*/

export default function(state = null, action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            let firstCursor = null;
            let lastCursor = null;
            if(action.payload.prods) {
                lastCursor = getProductCursor(action.payload.prods);
                firstCursor = getProductCursor(action.payload.prods,true);
            }
            console.log("productReducer: ", action.payload.page);
            return Object.assign({}, state, {
                lastCursor: lastCursor,
                firstCursor: firstCursor,
                prods: action.payload.prods|| false,
                page: action.payload.page || false
            });

        default:
            return state;
    }
}

function getProductCursor(products, reverse) {
    if (!products) {
        return;
    }
    if(reverse){
        return products[0].cursor;
    }
    let val = products[products.length - 1];
    return val.cursor;
}


