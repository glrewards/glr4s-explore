import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card,Icon,Row,Col } from "react-materialize";

class UserDetailCard extends Component {
  constructor(props) {
    super(props);
    this.renderAddress = this.renderAddress.bind(this);
  }

renderAddress(address){
  if(typeof(address) === 'string'){
      return address;
  }else{
      let addressString = JSON.stringify(address);
      return addressString;
  }
  }

  render() {
    return (
      <div>
        <Card
          className={"blue darken-3 center-align"}
          textClassName="white-text"
          title={this.props.firstName + " " + this.props.lastName}
        >
            <Row><Col s={6} className={"flow-text left-align"}>email: {this.props.email}</Col>
                <Col s={6} className={"flow-text"}>Address: {this.renderAddress(this.props.address)}</Col></Row>
        </Card>
      </div>
    );
  }
}

UserDetailCard.propTypes = {
    id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired
};

export default UserDetailCard;
