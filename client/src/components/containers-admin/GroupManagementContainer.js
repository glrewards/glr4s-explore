/**
 * this component will contain 4 others.
 *
 * A member search bar
 * A list of matching members
 * a group summary set of fields (name etc)
 * buttons for moving users between the general list and the group
 *
 */
import PropTypes from "prop-types";
import React, { Component } from "react";
import UserSearch from "../user/UserSearch";
import UserList from "../user/UserList";
import { connect } from "react-redux";
import {Button, Chip, Col, Collection, CollectionItem, Row, Select} from "react-materialize";

class GroupManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMemberClicked = this.handleMemberClicked.bind(this);
  }

  handleSearch() {
      console.log("do search");
  }

  handleMemberClicked(event){
      console.log(event.nativeEvent);
  }
  render() {
    const temp = [
      { userId: "23123123werwq", firstName: "john", lastName: "Bloggs" }
    ];
    const temp2 = [
      { userId: "dsfsdfewrewrew", firstName: "Joe", lastName: "Smith" },
      { userId: "21312313weqeqwe", firstName: "Sarah", lastName: "Jones" }
    ];
    const buttonClass =
      "col amber darken-4 waves-effect waves-purple valign-wrapper";
    return (
      <div>
        <UserSearch search={this.handleSearch} />
        <Row>
          <Col s={5}>
            <UserList userList={temp} onUserSelected={(e) => {this.handleMemberClicked(e)}} />
          </Col>
          <Col style={{ border: "dashed" }} s={2}>
            <Row>
              <Button className={buttonClass}>Add</Button>
            </Row>{" "}
            <Row>
              <Button className={buttonClass}>Remove</Button>
            </Row>
          </Col>
          <Col s={5}>
              <Collection>
                  <CollectionItem>
                      <Chip options={{onChipSelect: () => {console.log("test")}}}>Alvin</Chip>
                  </CollectionItem>
                  <CollectionItem>
                      <Chip>Alvin</Chip>
                  </CollectionItem>
                  <CollectionItem>
                      <Chip>Alvin</Chip>
                  </CollectionItem>
                  <CollectionItem>
                      <Chip>Alvin</Chip>
                  </CollectionItem>
              </Collection>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GroupManagementContainer;
