import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

let store = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk))
  );
}else{

store = createStore(reducers, {}, applyMiddleware(reduxThunk));

}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
