//index file within reducuers directory
import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveysReducer';
import studentReducer from './studentReducer';
import categorysReducer from "./categorysReducer";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import XODstudentReducer from "./XODStudentsReducer";
import XODSchoolReducer from "./XODSchoolReducer";
import XODSingleStudentReducer from "./XODSingleStudentReducer";
import XODAchievementsReducer from "./XODAchivementReducer";
import cabinetReducer from "./rewardReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
    auth: authReducer,
    cabinet: cabinetReducer,
    cart: cartReducer,
    order: orderReducer,
    form: reduxForm,
    surveys: surveyReducer,
    students: studentReducer,
    xodstudents: XODstudentReducer,
    xodSingleStudent: XODSingleStudentReducer,
    xodschool:XODSchoolReducer,
    xodAchievements: XODAchievementsReducer,
    categories: categorysReducer,
    products: productsReducer
});
