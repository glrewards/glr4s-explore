/**
 * Generic component for listing order details
 **/

import React, { Component } from "react";
import {Table} from "react-materialize";
import PropTypes from "prop-types";
import OrderDetail from "./OrderDetails";

export default class OrderList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.orderList) return <div></div>;
        const orderList = this.props.orderList;
    return(
        <Table hoverable = {true}><thead>
    <th data-field="_id">Id</th>
    <th data-field="name">Name</th>
    <th data-field="fulfillStatus">Status</th>
    <th data-field="createdDate">Date Opened</th>
    <th data-field="lineCount"> Line Count</th>
    </thead>
        <tbody>
        {orderList.map((order) =>
            <tr id={order._id}>
            <td id={order._id}>{order._id}</td>
                <td id={order._id}>{order._learningCentreId}</td>
                <td id={order._id}>{order.fulfillStatus}</td>
                <td> {order.dateReceived}</td>
                <td> {order.lineItems.length}</td>
            </tr>
        )}

        </tbody>
    </Table>)
    }


}
OrderList.propTypes = {
    isOpenOrder: PropTypes.bool,
    orderList: PropTypes.array.isRequired,
    lineCount: PropTypes.number,
    onLineClicked: PropTypes.func.isRequired //master detail trigger
};
