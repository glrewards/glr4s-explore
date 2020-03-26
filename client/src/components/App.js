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
import ApiClient from "../swagger/swagclient/ApiClient";
import ProductApi from "../swagger/swagclient/ProductApi";
import InlineResponse200 from "../swagger/swagclient/InlineResponse200";


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
    const {instance} = ApiClient;
    let defaultClient = instance;
// Configure API key authorization: ApiKeyAuth
    let ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
    ApiKeyAuth.apiKey = "ryC5CggcgpeBB23gJJORiYK9oWIUfyew";

    let apiInstance = new ProductApi();
    let opts = {
      'searchString': 'bookmark' // String | pass a string that is used to search the title and description
    };
    apiInstance.getProducts(opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
      }
    });
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
