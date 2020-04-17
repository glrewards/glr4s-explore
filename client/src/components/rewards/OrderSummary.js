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
    console.log(this.props);
    return (

      <Row style={roundedContainerStyle} className="light-blue">
        <Col s={12}>
            <Row>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title="Total Cards"
                >
                  <strong>
                    <h2 className="flow-text">{this.props.totalLizardCards}</h2>
                  </strong>
                </Card>
              </Col>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title="Total Lines"
                >
                  <strong>
                    <h2 className="flow-text">{this.props.totalLines}</h2>
                  </strong>
                </Card>
              </Col>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title="Most Ordered"
                >
                  <strong>
                    <h2 className="blue-text flow-text">
                      <a href="#">{this.props.mostPopular}</a>
                    </h2>
                  </strong>
                </Card>
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
  fulfillStatus: PropTypes.string,
  totalLizardCards: PropTypes.number.isRequired,
  totalLines: PropTypes.number.isRequired,
  mostPopular: PropTypes.string.isRequired
};
