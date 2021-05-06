import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProgressBar, Row } from "react-materialize";
import SuperAdminDashboard from "../admin/SuperAdminDashboard";
import { search } from "../../actions/UIActions";
import { fetchOrdersByParams } from "../../actions/orderActions";

class SuperAdminDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOrderLineClicked = this.handleOrderLineClicked.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.appendLeadingZeroes = this.appendLeadingZeroes.bind(this);
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  handleOrderLineClicked(event) {
    //doing nothing
  }
  handleSearchSubmit(event) {
    console.log("handleSearchSubmit");
    console.log(this.props.searchParams);
    this.props.dispatch(fetchOrdersByParams(this.props.searchParams));
  }
  handleSearch(event) {
    console.log(event);
    if (Object.prototype.toString.call(event) === "[object Date]") {
      //there is some odd bug in the api router that does not recognise there default date format so build here
      const month = event.getMonth() + 1; //starts at 0
      let parsedDate =
        event.getFullYear() +
        "-" +
        this.appendLeadingZeroes(month) +
        "-" +
        this.appendLeadingZeroes(event.getDate());

      this.props.dispatch(search("fromDate", parsedDate));
    } else {
      this.props.dispatch(search(event.target.id, event.target.value));
    }
  }
  render() {
    return (
      <SuperAdminDashboard
        onOrderLineClicked={this.handleOrderLineClicked}
        onSearch={this.handleSearch}
        onSubmitSearch={this.handleSearchSubmit}
      />
    );
  }
}
function mapStateToProps(state) {
  console.log(state.ui);
  return {
    //we care about the orderSearchParams
    searchParams: state.ui.searchParams
  };
}

export default connect(mapStateToProps)(SuperAdminDashboardContainer);
