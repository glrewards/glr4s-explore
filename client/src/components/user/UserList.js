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
        <CollectionItem id={this.props.userList[i].username} key={this.props.userList[i].username} className={"blue-text"} onClick={this.props.onUserSelected}>
          {this.props.userList[i].firstName +
            " " +
            this.props.userList[i].lastName}{" "}
          <a
              className="secondary-content"
              href="javascript:void(0)"
          >
          </a>
        </CollectionItem>
      );
    }

    return (
      <div>
        <Row>
          <Col s={12}>
            <Collection className={"blue-text lighten-3 center-align"} style={{"listStyleType": "none"}}>
              {items}
            </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}

UserList.propTypes = {
  enabled: PropTypes.bool,
  header: PropTypes.string,
  userList: PropTypes.array.isRequired,
  onUserSelected: PropTypes.func.isRequired
};

export default UserList;
