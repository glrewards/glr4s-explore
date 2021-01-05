import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card,Icon,Row,Col } from "react-materialize";

class UserDetailCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card
          className={"blue darken-3 center-align"}
          closeIcon={<Icon>close</Icon>}
          revealIcon={<Icon>more_vert</Icon>}
          textClassName="white-text"
          title={this.props.firstName + " " + this.props.lastName}
        >
            <Row><Col s={6} className={"flow-text left-align"}>email: {this.props.email}</Col>
                <Col s={6} className={"flow-text"}>Address: {this.props.address}</Col></Row>
        </Card>
      </div>
    );
  }
}

UserDetailCard.propTypes = {
    id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

export default UserDetailCard;