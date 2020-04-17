import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import GLRHeader from "./GLRHeader";
import Dashboard from "./Dashboard";
import GLRShop2 from "./shop/GLRShop2";
import StudentDashboard from "./student/StudentProfileDashboard";
import SimpleCartList from "./shop/SimpleCartList";
import XODStudentDashboard from "./student/XODStudentDashboard";
import CentreDashboard from "./containers-rewards/CentreDashBoard"
import EmailNew from "./email/EmailNew";
import CabinetContainer from "./containers-rewards/CabinetContainer";
import M from "materialize-css"; //don't delete while I am still using the non react version somewhere
import SignUpContainer from "./login/SignUpContainer";


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //like an initialize function
    //we imported connect above to link react components to the redux store stuff
    //the exp[ort at the bottom means the actions will not be in the props for this
    //class
      console.log("in App component did mount");
      this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <GLRHeader />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/shop" component={GLRShop2} />
            <Route path="/students/school" component={XODStudentDashboard} />
            <Route exact path="/students/all" component={StudentDashboard} />
            <Route exact path="/shop/cart" component={SimpleCartList} />
            <Route path="/email/new" component={EmailNew} />
            <Route
              path="/school/:schoolId/student/:studentId"
              component={StudentDashboard}
            />
            <Route path="/admin" component={CentreDashboard} />
            <Route path="/rewards" component={CabinetContainer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
