import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfList from "./ShelfList";

export default class OrderSummary extends Component {
    render() {
       return("Summary here");
    }
}
OrderSummary.propTypes = {
    id: PropTypes.string,
    finStatus: PropTypes.string,
    fulfillStatus: PropTypes.string,
    calcTotalPoints: PropTypes.func.isRequired,
    calcTotalLines: PropTypes.func.isRequired
};