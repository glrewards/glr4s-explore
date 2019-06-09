//index file within reducuers directory
import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveysReducer';
import studentReducer from './studentReducer';
import categorysReducer from "./categorysReducer";
import lineItemReducer from "./lineItemsReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";


export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveyReducer,
    students: studentReducer,
    categories: categorysReducer,
    products: productsReducer,
    lineItems: lineItemReducer,
    cart: cartReducer
});
