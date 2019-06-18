import axios from "axios";
import { FETCH_USER } from "./types";
import {FETCH_SURVEYS} from "./types";
import {FETCH_PRODUCTS} from "./types";
import {FETCH_CATEGORIES} from "./types";
import {FETCH_ALL_STUDENTS} from "./types";
import {FETCH_ALL_XOD_STUDENTS} from "./types";
import {NEW_CATEGORY} from "./types";
import {FETCH_LINEITEMS} from "./types";
import {DELETE_ALL_LINES} from "./cartActions";
import {FETCH_XOD_STUDENT} from "./types";

/*
    remember dispatch is a function (it is the action dispatcher
    which we can use here because have imported reactThunk
    which will let us intercept the action dispatching process when we
    return a function from an action.

    we are using it here because we don't want to dispatch until after our
    async get has returned something - at which point we can trigger the refresh that
    goes with this


     */
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe',token);
  dispatch({type: FETCH_USER,payload: res.data});
};

export const submitSurvey = (values,history) => async dispatch => {
  const res = await axios.post('/api/surveys',values);
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload: res.data});
};


export const fetchSurveys = () => async dispatch =>{
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data});

};

export const fetchCategories = () => async dispatch =>{
  const res = await axios.get('/api/categories');
  dispatch({type: FETCH_CATEGORIES, payload: res.data});

};

/* this is the shopify fetch products route */

export const fetchProducts = (cursor,backward) => async dispatch =>{
  let url = '/api/shop/products';
  if(cursor){
    url = url + "?cursor=" + cursor;
  }
  if(backward){
    if (!cursor){
      url = url + "?backward=" + backward;
    }else{
      url = url + "&backward=" + backward;
    }
  }
  const res = await axios.get(url);
  dispatch({type: FETCH_PRODUCTS, payload: res.data});

};

export const submitCategory = (values) => async dispatch =>{
  //console.log("in submitCategory action");
  const res = await axios.post('/api/categories',values);
  //console.log("in submitCategory");
  dispatch({type: NEW_CATEGORY, payload: res.data});
};

export const fetchAllStudents = () => async dispatch => {
  const res = await axios.get("/api/students/all");
  dispatch({ type: FETCH_ALL_STUDENTS, payload: res.data });
};

export const fetchAllXODStudents = (schoolId) => async dispatch => {
  const url = "/api/Students/School/" + schoolId;
  const res = await axios.get(url);
  dispatch({ type: FETCH_ALL_XOD_STUDENTS, payload: res.data });
};

export const fetchXODStudent = (schoolId,studentId) => async dispatch => {
  const url = "/api/School/" + schoolId + "/Student/" + studentId;
  const res = await axios.get(url);
  dispatch({ type: FETCH_XOD_STUDENT, payload: res.data });
};
/* There are the order and line items routes */
export const fetchLineItems = (student) => async dispatch => {
  const url = "/api/orders/" + student._id;
  const res = await axios.get(url);
  dispatch({type: FETCH_LINEITEMS, payload: res.data});
};

export const submitLineItems = (reqBody,history) => async dispatch => {
  const res = await axios.post('/api/orders', reqBody);
  dispatch({type:DELETE_ALL_LINES});//actually we clear the the local cart and then can populate the lineitems
  dispatch({type:FETCH_USER, payload: res.data});
  history.push('/shop');

};


