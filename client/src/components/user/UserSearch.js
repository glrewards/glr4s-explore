import PropTypes from "prop-types";
import React, { Component } from "react";
import { Col, TextInput, Button, Icon, Row } from "react-materialize";

class UserSearch extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const buttonClass =
      "col amber darken-4 right waves-effect waves-purple valign-wrapper";
    const titleStyle = {
      padding: "10px",
      borderBottomStyle: "solid",
      borderWidth: "2px",
      borderColor: "grey"
    };
    return (
      <div>
        <Row style={titleStyle}>
          <Col s={12}>
            <TextInput
              id={"firstName"}
              label={"First Name"}
              onChange={e => {
                this.props.inputChanged(e);
              }}
            />
            <TextInput
              id={"lastName"}
              label={"Last Name"}
              onChange={e => {
                this.props.inputChanged(e);
              }}
            />
            <Button
              className={buttonClass}
              disabled={false}
              onClick={() => {
                this.props.search();
              }}
            >
              Search{" "}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

UserSearch.propTypes = {
  search: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired
};

export default UserSearch;
