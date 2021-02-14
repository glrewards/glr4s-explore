import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, Row, Dropdown, Divider, Icon} from "react-materialize";

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
              <Dropdown
                  id="Dropdown_6"
                  options={{
                    alignment: 'left',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    container: null,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                  }}
                  trigger={<Button node="button">Previous Orders</Button>}
              >
                <a href="#">
                  one
                </a>
                <a href="#">
                  two
                </a>
                <Divider />
                <a href="#">
                  three
                </a>
                <a href="#">
                  <Icon>
                    view_module
                  </Icon>
                  four
                </a>
                <a href="#">
                  <Icon>
                    cloud
                  </Icon>
                  {' '}five
                </a>
              </Dropdown>
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
