import axios from "axios";
import {START_LOGIN} from "./types";
import { FETCH_USER } from "./types";
import {SET_ORDER_USER} from "./types";
import { FETCH_PRODUCTS } from "./types";
import { FETCH_ALL_STUDENTS } from "./types";
import { FETCH_ALL_XOD_STUDENTS } from "./types";
import { NEW_CATEGORY } from "./types";
import { NEW_EMAIL} from "./types";
import { DELETE_ALL_LINES } from "./cartActions";
import { FETCH_XOD_STUDENT } from "./types";
import { FETCH_XOD_ACHIEVEMENTS } from "./types";
import { SET_STUDENT_PAGES } from "./types";
import {UPDATE_FAVS} from "./types";

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
  let res = await axios.get("/api/current_user");
  //console.log("in fetchUser",res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  // i dont want to reset the selected user if this is  guardian as the guardian does not have a student
  // section and so the populating the member order section will fail
  // this happens when a guardian deletes an item from the kids order and then the whole refresh kicks in
  // to refresh the lizard points etc.
  if(res && res.data) {
    if (!res.data.roles.includes("guardian")) {
      dispatch({type: SET_ORDER_USER, payload: res.data});
    }
  }
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* this is the shopify fetch products route */

export const fetchProducts = (cursor, backward) => async dispatch => {
  let url = "/api/shop/products";
  if (cursor) {
    url = url + "?cursor=" + cursor;
  }
  if (backward) {
    if (!cursor) {
      url = url + "?backward=" + backward;
    } else {
      url = url + "&backward=" + backward;
    }
  }
  const res = await axios.get(url);
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

export const submitCategory = values => async dispatch => {
  //console.log("in submitCategory action");
  const res = await axios.post("/api/categories", values);
  //console.log("in submitCategory");
  dispatch({ type: NEW_CATEGORY, payload: res.data });
};

export const updateFavourite = (userId, value, add) => async dispatch => {
 //axios.defaults.baseURL = process.env.REACT_APP_API_URL;
 //console.log(process.env.REACT_APP_API_URL);
 //console.log(axios);
  const instance = axios.create({
    baseURL: "/"
  });
  let url = "api/users/" + userId + "/favourites";
  let param = {"_rewardId": value};
  let res = {};
  try {
    if (add){
      res = await instance.post(url, param);
      //console.log(res);
    }else{
      url = url + "/" + value;
      console.log(url);
      res = await instance.delete(url);
    }
    await dispatch(fetchUser());
    dispatch({type: UPDATE_FAVS, payload: res.data});
  }catch(e){
    console.log(e);
  }
};
export const submitLogin = (values) => async dispatch => {
  const res = await axios.post("/login", values);
  dispatch({ type: START_LOGIN, payload: res.data });
  dispatch({type: SET_ORDER_USER, payload: res.data});
};
export const submitEmail = (values,history) => async dispatch => {
  const res = await axios.post('/api/surveys',values);
  history.push('/admin');
  console.log("in submitEmail");
  dispatch({type: NEW_CATEGORY, payload: res.data});
};

export const fetchAllStudents = () => async dispatch => {
  const res = await axios.get("/api/students/all");
  dispatch({ type: FETCH_ALL_STUDENTS, payload: res.data });
};

export const fetchAllXODStudents = (
  schoolId,
  page,
  limit
) => async dispatch => {
  let url = "/api/Students/School/" + schoolId;
  if (page) {
    url += "/?page=" + (page - 1);
  }
  if (!page && limit) {
    url += "/?limit=" + limit;
  } else {
    if (limit) {
      url += "&limit=" + limit;
    }
  }
  //const url = "/api/Students/School/" + schoolId;
  const res = await axios.get(url);
  dispatch({ type: FETCH_ALL_XOD_STUDENTS, payload: res.data });
};

export const fetchXODStudentCount = schoolId => async dispatch => {
  let url = "/api/StudentsCount/School/" + schoolId;
  const res = await axios.get(url);
  dispatch({ type: SET_STUDENT_PAGES, payload: res.data });
};

export const fetchXODStudent = (schoolId, studentId) => async dispatch => {
  const url = "/api/School/" + schoolId + "/Student/" + studentId;
  const res = await axios.get(url);
  dispatch({ type: FETCH_XOD_STUDENT, payload: res.data });
};

export const fetchXODStudentAchievements = (
  schoolId,
  studentId
) => async dispatch => {
  const url =
    "/api/School/" + schoolId + "/Student/" + studentId + "/AchievementSummary";
  const res = await axios.get(url);

  dispatch({ type: FETCH_XOD_ACHIEVEMENTS, payload: res.data });
};


