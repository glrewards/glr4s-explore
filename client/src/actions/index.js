import axios from "axios";
import { FETCH_USER } from "./types";
import {FETCH_SURVEYS} from "./types";
import {FETCH_PRODUCTS} from "./types";
import {FETCH_CATEGORIES} from "./types";
import {FETCH_ALL_STUDENTS} from "./types";
import {NEW_CATEGORY} from "./types";

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
  console.log("in submitSurvey");
  dispatch({type: FETCH_USER, payload: res.data});
};


export const fetchSurveys = () => async dispatch =>{
  const res = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEYS, payload: res.data});

};

export const fetchCategories = () => async dispatch =>{
  console.log("in fetchCategories()");
  const res = await axios.get('/api/categories');
  dispatch({type: FETCH_CATEGORIES, payload: res.data});

};

export const fetchProducts = () => async dispatch =>{
  const res = await axios.get('/api/shop/products');
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

