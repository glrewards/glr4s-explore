/**
 * Generic component for listing line items in a tabular form
 **/

import React, { Component } from "react";
import { Table } from "react-materialize";
import PropTypes from "prop-types";


export default class LineItemsTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("LineItemsTable: render() " + JSON.stringify(this.props));
        if (!this.props.lineItems) return (<div> no lines </div>);
        const lines = this.props.lineItems;
        return (
            <div>
                <Table hoverable={true} className={"flow-text"}>
                    <thead>
                    <tr>
                        <th data-field="memberName">Member Name</th>
                        <th data-field="productTitle">Product</th>
                        <th data-field="quantity">Quantity</th>
                        <th data-field="glrpoints"> Points</th>
                        <th data-field="img">Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lines.map(line => {
                        return (
                            <tr
                                key={line._id}
                                id={line._id}
                            >
                                <td id={line._id}>{line.memberFirstName + " " + line.memberLastName}</td>
                                <td id={line._id}>{line.productTitle}</td>
                                <td id={line._id}> {line.quantity}</td>
                                <td id={line._id}> {line.glrpoints}</td>
                                <td id={line._id}><img alt={line.productTitle} src={line.img}
                                                       style={{height: "50px", width: "auto"}}/></td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
LineItemsTable.propTypes = {
    lineItems: PropTypes.array
};
