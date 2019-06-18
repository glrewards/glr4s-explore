import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import GLRHeader from "./GLRHeader";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import GLRShop2 from './shop/GLRShop2';
import StudentDashboard from "./student/StudentDashboard";
import CategoryDashboard from "./admin/CategoryDashboard";
import OrderDashboard from "./shop/OrderDashboard";
import SimpleCartList from "./shop/SimpleCartList";
import XODStudentDashboard from "./student/XODStudentDashboard";
import AdminDashboard from "./admin/AdminDashBoard";


/*
const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});
*/
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
            <Route exact path="/shop" component={GLRShop2} />
            <Route path="/categories" component={CategoryDashboard} />
            <Route path="/students/school" component={XODStudentDashboard} />
            <Route exact path="/students/all" component={StudentDashboard} />
            <Route exact path="/shop/myitems" component={OrderDashboard} />
            <Route exact path="/shop/cart" component={SimpleCartList} />
            <Route path="/students/:userId" />
            <Route path="/admin" component={AdminDashboard}/>
           </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions) (App);
