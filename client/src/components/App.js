import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../actions";
import M from "materialize-css";
import Landing from "./Landing";
import GLRHeader from "./GLRHeader";
import Dashboard from "./Dashboard";
import GLRShop2 from "./shop/GLRShop2";
import StudentDashboard from "./student/StudentProfileDashboard";
import OrderDashboard from "./shop/OrderDashboard";
import SimpleCartList from "./shop/SimpleCartList";
import XODStudentDashboard from "./student/XODStudentDashboard";
import AdminDashboard from "./admin/AdminDashBoard";
import {HandleProgressBar} from "./ProgressBar";
import AdminDashOrderDetails from "./admin/AdminDashOrderDetails";
import EmailNew from "./email/EmailNew";

/*
const client = new ApolloClient({
    fetchOptions: {
        credentials: 'include'
    }
});
*/
class App extends Component {
  constructor(props) {
    super(props);
    M.AutoInit();
  }
  componentDidMount() {
    //like an initialize function
    //we imported connect above to link react components to the redux store stuff
    //the exp[ort at the bottom means the actions will not be in the props for this
    //class
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <HandleProgressBar />
            <GLRHeader />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/shop" component={GLRShop2} />
            <Route path="/students/school" component={XODStudentDashboard} />
            <Route exact path="/students/all" component={StudentDashboard} />
            <Route exact path="/shop/myitems" component={OrderDashboard} />
            <Route exact path="/shop/cart" component={SimpleCartList} />
            <Route path="/email/new" component={EmailNew} />
            <Route
              path="/school/:schoolId/student/:studentId"
              component={StudentDashboard}
            />
            <Route path="/admin" component={AdminDashboard} />
            <Route exact path="/admin/cart" component={AdminDashOrderDetails} />
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
