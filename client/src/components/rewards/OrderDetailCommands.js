import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, Row} from "react-materialize";

export default class OrderDetailCommands extends Component {
  render() {
    const roundedContainerStyle = {
      borderRadius: "10px",
      padding: "10px"
    };
    const titleStyle = {
      borderRadius: "5px"
    };
    const buttonClass = "col amber darken-4 right waves-effect waves-purple valign-wrapper";

    return (
        <Row>
          <Col s={12}>
            <Row style={titleStyle}>
              <Button className={buttonClass}
                      disabled={false}
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
