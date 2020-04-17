import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfList from "./ShelfList";
import { CardPanel, Card, CardTitle, Row, Col } from "react-materialize";

export default class OrderDetail extends Component {
    render() {
        const roundedContainerStyle = {
            "borderRadius": "10px",
            padding: "10px"
        };
        const titleStyle = {
            "borderRadius": "5px"
        };
        console.log(this.props);
        return (

            <Row style={roundedContainerStyle} className="light-blue">
                <Col s={12}>
                </Col>
            </Row>
        );
    }
}

OrderDetail.propTypes = {
    id: PropTypes.string,
    finStatus: PropTypes.string,
    fulfillStatus: PropTypes.string,
    totalLizardCards: PropTypes.number.isRequired,
    totalLines: PropTypes.number.isRequired,
    mostPopular: PropTypes.string.isRequired
};
