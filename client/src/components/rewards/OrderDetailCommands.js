import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfList from "./ShelfList";
import {
  Button,
  CardPanel,
  Card,
  CardTitle,
  Row,
  Col
} from "react-materialize";

export default class OrderDetailCommands extends Component {
  render() {
    const roundedContainerStyle = {
      borderRadius: "10px",
      padding: "10px"
    };
    const titleStyle = {
      borderRadius: "5px"
    };
    const buttonClass = "col amber darken-4 right waves-effect waves-purple";

    return (
        <Row style={roundedContainerStyle} className="light-blue lighten-3">
          <Col style={titleStyle} s={12}>
            <Row>
              <Button className={buttonClass}
              onClick={() => {this.props.deleteClick()}}>Delete</Button>
            </Row>
          </Col>
        </Row>
    );
  }
}
OrderDetailCommands.propTypes = {
  deleteClick: PropTypes.func.isRequired
};
