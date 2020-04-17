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
          <CardPanel className="light-blue">
            <CardTitle style={titleStyle} className="blue center-align">
              <h2>Current Order</h2>
            </CardTitle>
            <Row>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title={<h2>Total Cards</h2>}
                >
                  <strong>
                    <h2>{this.props.totalLizardCards}</h2>
                  </strong>
                </Card>
              </Col>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title={<h2>Total Lines</h2>}
                >
                  <strong>
                    <h2>{this.props.totalLines}</h2>
                  </strong>
                </Card>
              </Col>
              <Col s={4}>
                <Card
                  style={roundedContainerStyle}
                  className="light-blue lighten-4 center-align"
                  title={<h2>Most Ordered</h2>}
                >
                  <strong>
                    <h2 className="blue-text">
                      <a href="#">{this.props.mostPopular}</a>
                    </h2>
                  </strong>
                </Card>
              </Col>
            </Row>
          </CardPanel>
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
