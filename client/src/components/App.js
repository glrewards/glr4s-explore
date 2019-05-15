import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Header from "./Header";
import GLRHeader from "./GLRHeader";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';


class App extends Component {
    componentDidMount() {
        //like an initialize function
        //we imported connect above to link react components to the redux store stuff
        //the exp[ort at the bottom means the actions will not be in the props for this
        //class
        this.props.fetchUser();
    }

    render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <GLRHeader />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);
