import React, { Component } from "react";
import OrderList from "../rewards/OrderList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchOrdersByParams } from "../../actions/orderActions";
import {selectOrder} from "../../actions/UIActions";
//import {fetchCabinet} from "../../actions/rewardActions";

class OrderListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleLineClicked = this.handleLineClicked.bind(this);
  }

  componentDidMount() {
          console.log("Order List Container componentdidmount");
          //this.props.dispatch(fetchOrdersByParams());
  }

  render() {
    return (<OrderList orderList={this.props.orderList} onLineClicked={this.handleLineClicked} />);
  }
  handleLineClicked(event) {
    console.log(event.nativeEvent.target);
    this.props.dispatch(selectOrder(event.nativeEvent.target.id));
    //this event needs to be thrown upward

    this.props.onLineClicked(event);
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
  orderStatus: PropTypes.string.isRequired,
  orderList: PropTypes.array,
  onLineClicked: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(OrderListContainer);
