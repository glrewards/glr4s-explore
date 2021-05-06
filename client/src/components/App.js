import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Landing from "./Landing";
import GLRHeader from "./GLRHeader";
import GLRShop2 from "./shop/GLRShop2";
import SimpleCartList from "./shop/SimpleCartList";
import CentreDashboard from "./containers-rewards/CentreOrderListContainer"
import EmailNew from "./email/EmailNew";
import CabinetContainer from "./containers-rewards/CabinetContainer";
import RewardContainer from "./containers-rewards/RewardContainer";
import GuardianDashboardContainer from "./containers-user/GuardianDashboardContainer";
import GroupManagementContainer from "./containers-admin/GroupManagementContainer";

import M from "materialize-css"; //don't delete while I am still using the non react version somewhere
import SignUpContainer from "./login/SignUpContainer";
import MemberOrderContainer from "./containers-rewards/MemberOrderContainer";
import SuperAdminDashboardContainer from "./containers-admin/SuperAdminDashboardContainer";
import PDFContainer from "./containers-reports/PDFContainer";



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
    //<Route path="/reports" component={PDFContainer} />
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <GLRHeader />
            <Route exact path="/" component={Landing} />
            <Route path="/lineitems" component={MemberOrderContainer} />
            <Route exact path="/shop" component={GLRShop2} />
            <Route exact path="/shop/cart" component={SimpleCartList} />
            <Route path="/email/new" component={EmailNew} />
            <Route path="/admin" component={CentreDashboard} />
            <Route path="/glradmin" component={SuperAdminDashboardContainer} />
            <Route path="/cabinet" component={CabinetContainer} />
            <Route path="/guardian" component={GuardianDashboardContainer} />
            <Route path="/reward/:id" component={RewardContainer} />
            <Route path="/centremaint" component={GroupManagementContainer} />

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
