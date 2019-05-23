import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Header from "./Header";
import GLRHeader from "./GLRHeader";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import GLRShop from './shop/GLRShop';
import CategoryNew from './admin/CategoryNew';
import ApolloClient from 'apollo-boost';
import {HttpLink} from 'apollo-link-http';
import { ApolloLink, concat } from 'apollo-link';
import StudentDashboard from "./student/StudentDashboard";


const link = new HttpLink({ uri: 'https://glrdev.myshopify.com/admin/api/graphql.json' });

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
            <Route path="/categories" component={CategoryNew} />
            <Route exact path="/students/all" component={StudentDashboard} />
           </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);
