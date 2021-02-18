/**
 * Generic component for listing order details
 **/

import React, { Component } from "react";
import PropTypes from "prop-types";
import OrderDetail from "./OrderDetails";

export default class OrderList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    return('list will go here')
    }


}
OrderList.propTypes = {
    isOpenOrder: PropTypes.bool,
    isAdmin: PropTypes.bool,
    lineItems: PropTypes.array.isRequired,
    lineCount: PropTypes.number,
    onLineClicked: PropTypes.func.isRequired //master detail trigger
};
