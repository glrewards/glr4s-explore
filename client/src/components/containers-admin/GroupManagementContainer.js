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
import { connect } from "react-redux";
import UserSearch from "../user/UserSearch";
import UserList from "../user/UserList";
import {fetchMembers} from "../../actions/containerActions";
import {search} from "../../actions/UIActions";
import {Button, Chip, Col, Collection, CollectionItem, Row, Select} from "react-materialize";

class GroupManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMemberClicked = this.handleMemberClicked.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
  }

  handleSearch() {
      this.props.dispatch(fetchMembers());
  }
handleInputChanged(event){
    this.props.dispatch(search(event.target.id, event.target.value));

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
        <UserSearch search={this.handleSearch} inputChanged={this.handleInputChanged}/>
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

function mapStateToProps(state) {
    //not sure what state we need at this stage
    const orderList = state.order.GLROrderList;
    return {orderList: orderList}
}
export default connect(mapStateToProps)(GroupManagementContainer);
