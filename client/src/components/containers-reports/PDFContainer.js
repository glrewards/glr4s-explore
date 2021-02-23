/**
 * A simple mechanism for surfacing a puppeteer generated pdf within the context of our react app
 * This object is registered as the route for anything going to /reports url
 **/

import React, { Component } from "react";
import { connect } from "react-redux";
import {ProgressBar} from "react-materialize";


class PDFContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("PDFContainer: componentDidMount()");
        console.log(this.props);
    }

    render() {
        console.log("PDFContainer: render() ");
        console.log(this.props);
        return (
<div> report data here</div>

        );
    }
}

function mapStateToProps(state) {
    // this needs to map in the data needed to generate the report query
    //for now this is going to be really simple and just be the line items but it could be a query object
    //that we build as we go
    let lineItems = [];
    if(state.order) {
        if((state.order.GLROrderList) && (state.ui.masterOrderIndex)) {
            lineItems = state.order.GLROrderList[state.ui.masterOrderIndex];
        }
    }
    return {lineItems};
}

export default connect(
    mapStateToProps,
)(PDFContainer);
