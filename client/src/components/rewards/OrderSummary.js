import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfList from "./ShelfList";
import { CardPanel, Card, CardTitle, Row, Col } from "react-materialize";

export default class OrderSummary extends Component {
  render() {
    const roundedContainerStyle = {
      "borderRadius": "10px",
      padding: "10px"
    };
    const titleStyle = {
      "borderRadius": "5px"
    };
    return (

      <Row style={roundedContainerStyle} className="light-blue">
        <Col s={12}>
            <Row>
              <Col s={4}>
                <CardPanel
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                >
                  <CardTitle>Total Cards</CardTitle>
                  <strong>
                    <h2 className="flow-text">{this.props.totalLizardCards}</h2>
                  </strong>
                </CardPanel>
              </Col>
              <Col s={4}>
                <CardPanel
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align flow-text"
                  title="Total Lines"
                >
                  <CardTitle>Total Lines</CardTitle>
                  <strong>
                    <h2 className="flow-text">{this.props.totalLines}</h2>
                  </strong>
                </CardPanel>
              </Col>
              <Col s={4}>
                <CardPanel
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align flow-text"
                >
                  <CardTitle>Most Ordered</CardTitle>
                  <strong>
                    <h2 className="blue-text flow-text">
                      <a href="#">{this.props.mostPopular}</a>
                    </h2>
                  </strong>
                </CardPanel>
              </Col>
            </Row>
        </Col>
      </Row>
    );
  }
}

OrderSummary.propTypes = {

  id: PropTypes.string,
  finStatus: PropTypes.string,
  orderExists: PropTypes.bool,
  fulfillStatus: PropTypes.string,
  totalLizardCards: PropTypes.number.isRequired,
  totalLines: PropTypes.number.isRequired,
  mostPopular: PropTypes.string.isRequired
};
