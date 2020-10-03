import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Card,
  Icon,
  Row,
  Col,
  Collection,
  CollectionItem
} from "react-materialize";

class UserList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
            <h2 className={"center-align"}> Related Members</h2>
        <Row s={12}>
          <Col s={12}>
            <Collection className={"blue lighten-3 center-align"}>
              <CollectionItem href="#">user one</CollectionItem>
                <CollectionItem  href="#">user two</CollectionItem>
            </Collection>
          </Col>
        </Row>
        </div>
    );
  }
}

UserList.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  relatedUsers: PropTypes.array.isRequired
};

export default UserList;
