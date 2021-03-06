//types
import {
  FETCH_CABINET_REQUEST,
  FETCH_CABINET_FAILURE,
  FETCH_CABINET_SUCCESS,
  FETCH_CABINET,
  ADD_SHELF,
  EDIT_SHELF,
  FETCH_PRODUCTS,
  SET_ADD_CART_BUTTON_FILTER,
    FA
} from "./types";
import axios from "axios";

/* UI related actions types*/
export const VisibilityFilters = {
  SHOW_WITH_ADD: "show_with_add",
  SHOW_WITHOUT_ADD: "show_without_add"
};

/*
 * action creators
 */
export const REQUEST_CABINET = "request_cabinet";
function requestCabinet(centre) {
  return {
    type: REQUEST_CABINET,
    centre
  };
}

export const RECEIVE_CABINET = "receive_cabinet";
function receiveCabinet(centre, json) {
  //console.log(centre,json);
  return {
    type: RECEIVE_CABINET,
    centre,
    payload: json,
    receivedAt: Date.now()
  };
}

export const RECEIVE_CABINET_EMPTY = "receive_cabinet_empty";
function receiveCabinetEmpty(centre,json){
  return {
    type:RECEIVE_CABINET_EMPTY,
    centre,
    payload:json,
    receivedAt: Date.now()
  }
}

export const INVALIDATE_CABINET = "invalidate_cabinet";
export function invalidateCabinet(centre) {
  return {
    type: INVALIDATE_CABINET,
    centre
  };
}
export const FILTER_FAV = "filter_fav";

export function filterCabinet(filterSwitch) {
  return {
    type: FILTER_FAV,
    filterSwitch: filterSwitch
  };
}

/*
 * Async type actions (API calls)
 */

export const fetchCabinet = (centre, summary) => async dispatch => {
  let url = "/api/cabinet";
  let options = {
    params: {
      centre: centre,
      summary: summary
    }
  };
  dispatch(requestCabinet(centre)); //update state to say we are fetching cabinet
  try {
    const res = await axios.get(url, options);
    console.log("response data: ", res.data);
    dispatch(receiveCabinet(centre, res.data));
  } catch (e){
    console.log('exception caught: ' + e.message);
    dispatch(receiveCabinetEmpty(centre, {} ));
  }
};

