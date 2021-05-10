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
import {
  fetchMembers,
  itemClicked,
  addMembers,
  delMembers, setContainerFields, saveContainer
} from "../../actions/containerActions";
import { search } from "../../actions/UIActions";
import {
  Button,
  Chip,
  Col,
  Collection,
  CollectionItem,
  Row,
  Select,
  TextInput
} from "react-materialize";

class GroupManagementContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMemberClicked = this.handleMemberClicked.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
    this.handleDelClicked = this.handleDelClicked.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSearch() {
    this.props.dispatch(fetchMembers());
  }
  handleInputChanged(event) {
    this.props.dispatch(search(event.target.id, event.target.value));
  }
  handleMemberClicked(event) {
    console.log(event.nativeEvent.target.id);
    //dispatch the clicked action
    this.props.dispatch(itemClicked(event.nativeEvent.target.id));
  }
  handleAddClicked(event) {
    console.log("add clicked");
    this.props.dispatch(addMembers());
  }
  handleDelClicked(event) {
    console.log("del clicked");
    this.props.dispatch(delMembers());
  }

  handleSave(){
    console.log("save clicked");
    this.props.dispatch(saveContainer());
  }
  render() {
    const temp2 = [
      { userId: "dsfsdfewrewrew", firstName: "Joe", lastName: "Smith" },
      { userId: "21312313weqeqwe", firstName: "Sarah", lastName: "Jones" }
    ];
    const buttonClass =
      "col right amber darken-4 waves-effect waves-purple valign-wrapper";
    const centreStyle = {
      display: "flex",
      "justifyContent": "center",
      "alignItems": "center"
    };
    return (
      <div style={{borderStyle: "solid", borderWidth: "2px", borderColor: "grey"}}>

        <UserSearch
          search={this.handleSearch}
          inputChanged={this.handleInputChanged}
        />

        <Row>
          <Col s={5} >
            <div style={{ height: "300px", overflowY: "scroll", borderStyle: "solid", borderWidth: "1px" }}>
            <UserList
              userList={this.props.container.members}
              onUserSelected={e => {
                this.handleMemberClicked(e);
              }}
            />
          </div>
          </Col>
          <Col s={2}>
            <Row style={centreStyle}>
              <Button
                className={buttonClass}
                style={{ "paddingLeft": "30px", "paddingRight": "30px" }}
                onClick={this.handleAddClicked}
              >
                Add{" "}
              </Button>
            </Row>{" "}
            <Row style={centreStyle}>
              <Button
                className={buttonClass}
                style={{ "paddingLeft": "30px", "paddingRight": "30px" }}
                onClick={this.handleDelClicked}
              >
                {" "}
                Del{" "}
              </Button>
            </Row>
          </Col>
          <Col s={5}>
            <div style={{ height: "300px", overflowY: "scroll", borderStyle: "solid", borderWidth: "1px" }}>
            <UserList
              userList={this.props.container.group}
              onUserSelected={this.handleMemberClicked}
            />
            </div>
          </Col>
        </Row>
        <Row>
          <Col s={12}>

            <TextInput className={"right"} id={"name"} label={"Name"} onChange={e => {
              this.props.dispatch(setContainerFields(e.target.id,e.target.value));
            }}/>
            <TextInput id={"type"} label={"type"} onChange={e => {
              this.props.dispatch(setContainerFields(e.target.id,e.target.value));
            }}/>
            <Button className={buttonClass} onClick={this.handleSave}> Save Container</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const container = state.container;
  return { container: container };
}
export default connect(mapStateToProps)(GroupManagementContainer);
