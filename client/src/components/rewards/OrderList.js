/**
 * Generic component for listing order details
 **/

import React, { Component } from "react";
import { Table, Row,Button } from "react-materialize";
import PropTypes from "prop-types";

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
      <Row style={{ height: "300px", "overflowY": "scroll" }}>
        <Table hoverable={true} className="flow-text">
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
                  <td id={order._id}> {order.dateReceived}</td>
                  <td id={order._id}> {order.lineItems.length}</td>
                  <td><Button waves={"light"} >Test</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
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
