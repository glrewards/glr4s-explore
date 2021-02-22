import React, { Component } from "react";
import LineItemsTable from "../rewards/LineItemsTable";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class LineItemTableContainer extends Component {
    constructor(props) {
        super(props);
        this.handleLineClicked = this.handleLineClicked.bind(this);
        console.log("LineItemTableContainer: constructor");
    }

    componentDidMount() {
        // this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
        //this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
        console.log("LineItemTableContainer: componentDidMount()");
        //this.props.dispatch(fetchOrdersByParams());
    }

    render() {
        console.log("LineItemTableContainer: render()");
        return (<LineItemsTable lineItems={this.props.lineItems} />);
    }
    handleLineClicked(event) {
        console.log(event.nativeEvent.target.id);
        //this event needs to be thrown upward
        this.props.onLineClicked(event);
    }
}

function mapStateToProps(state) {
    const masterOrderIndex = state.ui.masterOrderIndex;
    let lineItems = null;
    if ((state.order.GLROrderList)&& (masterOrderIndex > -1)){
        lineItems = state.order.GLROrderList[masterOrderIndex].lineItems;
    }
    return {masterOrderIndex, lineItems};
}

export default connect(mapStateToProps)(LineItemTableContainer);
