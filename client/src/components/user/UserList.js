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
    //create the rows
    let items = [];
    for (let i = 0; i < this.props.userList.length; i++) {
      items.push(
        <CollectionItem href="#">
          {this.props.userList[i].firstName +
            " " +
            this.props.userList[i].lastName}{" "}
        </CollectionItem>
      );
    }

    return (
      <div>
        <h2 className={"center-align"}> Related Members</h2>
        <Row s={12}>
          <Col s={12}>
            <Collection className={"blue lighten-3 center-align"}>
              {items}
            </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}

UserList.propTypes = {
  userList: PropTypes.array.isRequired
};

export default UserList;
