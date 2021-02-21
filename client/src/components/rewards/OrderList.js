/**
 * Generic component for listing order details
 **/

import React, { Component } from "react";
import { Table } from "react-materialize";
import PropTypes from "prop-types";
import OrderDetail from "./OrderDetails";

const getColor = status => {
  if (status === "fulfilled") return "grey-text";
  if (status === "unfulfilled") return "green-text";
  if (status === "fulfilling") return "amber-text";
  return "";
};

export default class OrderList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.orderList) return <div />;
    const orderList = this.props.orderList;
    return (
      <div style={{ height: "300px", "overflowY": "scroll" }}>
        <Table hoverable={true}>
          <thead>
          <tr>
            <th data-field="name">Name</th>
            <th data-field="fulfillStatus">Status</th>
            <th data-field="createdDate">Date Opened</th>
            <th data-field="lineCount"> Line Count</th>
          </tr>
          </thead>
          <tbody>
            {orderList.map(order => {
              return (
                <tr
                    key={order._id}
                  id={order._id}
                  className={getColor(order.fulfillStatus)}
                  onClick={event => this.props.onLineClicked(event)}
                >
                  <td id={order._id}>{order._learningCentreId.name}</td>
                  <td id={order._id}>{order.fulfillStatus}</td>
                  <td> {order.dateReceived}</td>
                  <td> {order.lineItems.length}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
OrderList.propTypes = {
  orderStatus: PropTypes.string,
  isOpenOrder: PropTypes.bool,
  orderList: PropTypes.array,
  lineCount: PropTypes.number,
  onLineClicked: PropTypes.func.isRequired //master detail trigger
};
