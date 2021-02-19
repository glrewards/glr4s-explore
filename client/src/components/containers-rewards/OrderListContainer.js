import React, { Component } from "react";
import OrderList from "../rewards/OrderList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchOrdersByParams } from "../../actions/orderActions";
import {fetchCabinet} from "../../actions/rewardActions";

class OrderListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLineClicked = this.handleLineClicked.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
    //this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
          console.log("getting orders");
          this.props.dispatch(fetchOrdersByParams());
  }

  render() {
    return <OrderList orderList={this.props.orderList} onLineClicked={this.handleLineClicked} />;
  }
  handleLineClicked(event) {
    console.log(event.nativeEvent.target.id);
  }
}

function mapStateToProps(state) {
  //not sure what state we need at this stage
  const orderList = state.order.GLROrderList;
    return {orderList: orderList}
}

/**
 * these properties are intended to define the query parameters used to populate the list
 * might also need to think about specifying the display parameters
 */
OrderListContainer.propTypes = {
  orderStatus: PropTypes.string.isRequired
};
export default connect(mapStateToProps)(OrderListContainer);
