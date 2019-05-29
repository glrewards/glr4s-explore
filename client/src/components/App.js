import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import GLRHeader from "./GLRHeader";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import GLRShop from './shop/GLRShop';
import ApolloClient from 'apollo-boost';
import StudentDashboard from "./student/StudentDashboard";
import CategoryList from "./admin/CategoryList";

const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});

class App extends Component {
    componentDidMount() {
        //like an initialize function
        //we imported connect above to link react components to the redux store stuff
        //the exp[ort at the bottom means the actions will not be in the props for this
        //class
        this.props.fetchUser();
    }


    render() {
        console.log(process.env.REACT_APP_SHOPIFY_GQL);
        console.log(process.env.REACT_APP_X_SHOPIFY_STOREFRONT_ACCESS_TOKEN);

        return (
      <div className="container">
        <BrowserRouter>
          <div>
            <GLRHeader />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/shop" component={GLRShop} />
            <Route path="/categories" component={CategoryList} />
            <Route exact path="/students/all" component={StudentDashboard} />
           </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);
