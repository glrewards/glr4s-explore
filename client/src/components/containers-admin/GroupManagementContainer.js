/**
 * this component will contain 4 others.
 *
 * A member search bar
 * A list of matching members
 * a group summary set of fields (name etc)
 * buttons for moving users between the general list and the group
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import UserSearch from "../user/UserSearch";
import UserList from "../user/UserList";
import {
  fetchMembers,
  itemClicked,
  addMembers,
  delMembers, setContainerFields, saveContainer, addOwners, delOwners
} from "../../actions/containerActions";
import { search } from "../../actions/UIActions";
import {
  Button,
  Col,
  Row,
  TextInput
} from "react-materialize";

class GroupManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMemberClicked = this.handleMemberClicked.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);
    this.handleAddClicked = this.handleAddClicked.bind(this);
    this.handleDelClicked = this.handleDelClicked.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleAddOwnerClicked = this.handleAddOwnerClicked.bind(this);
    this.handleDelOwnerClicked = this.handleDelOwnerClicked.bind(this);
  }

  handleSearch() {
    this.props.dispatch(fetchMembers());
  }
  handleInputChanged(event) {
    this.props.dispatch(search(event.target.id, event.target.value));
  }
  handleMemberClicked(event) {
    console.log(event.nativeEvent);
    //dispatch the clicked action
    this.props.dispatch(itemClicked(event.nativeEvent.target));
  }
  handleAddClicked(event) {
    console.log("add clicked");
    this.props.dispatch(addMembers());
  }
  handleDelClicked(event) {
    console.log("del clicked");
    this.props.dispatch(delMembers());
  }

  handleAddOwnerClicked(event) {
    console.log("add owner clicked");
    this.props.dispatch(addOwners());
  }
  handleDelOwnerClicked(event) {
    console.log("del owner clicked");
    this.props.dispatch(delOwners());
  }

  handleSave(){
    console.log("save clicked");
    this.props.dispatch(saveContainer());
  }
  render() {

    const buttonClass =
      "col right amber darken-4 waves-effect waves-purple valign-wrapper";
    const centreStyle = {
      display: "flex",
      "justifyContent": "center",
      "alignItems": "center"
    };

    let status = "";
    if (this.props.container.saved === 'ok'){
      status = <div className={"light-green"}>saved</div>;
    }else if (this.props.container.saved  === 'nok'){
      status = <div className={"red"}>Not Saved</div>;
    }else{
      status = "";
    }
    return (
      <div style={{borderStyle: "solid", borderWidth: "2px", borderColor: "grey"}}>

        <UserSearch
          search={this.handleSearch}
          inputChanged={this.handleInputChanged}

        />

        <Row>
          <Col s={3} >
            <div style={{ height: "300px", overflowY: "scroll", borderStyle: "solid", borderWidth: "1px" }}>
            <UserList
              id={"members"}
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
                Add Member
              </Button>
            </Row>
            <Row style={centreStyle}>
              <Button
                className={buttonClass}
                style={{ "paddingLeft": "30px", "paddingRight": "30px" }}
                onClick={this.handleDelClicked}
              >
                Del Member
              </Button>
            </Row>
            <Row style={centreStyle}>
            <Button
                className={buttonClass}
                style={{ "paddingLeft": "30px", "paddingRight": "30px" }}
                onClick={this.handleAddOwnerClicked}
            >
              Add Owner
            </Button>
          </Row>
            <Row style={centreStyle}>
              <Button
                  className={buttonClass}
                  style={{ "paddingLeft": "30px", "paddingRight": "30px" }}
                  onClick={this.handleDelOwnerClicked}
              >
                Del Owner
              </Button>
            </Row>
          </Col>
          <Col s={3}>
            <div style={{ height: "300px", overflowY: "scroll", borderStyle: "solid", borderWidth: "1px" }}>
            <UserList
                id={"group"}
                header={"Members"}
              userList={this.props.container.group}
              onUserSelected={this.handleMemberClicked}
            />
            </div>
          </Col>
          <Col s={3}>
            <div style={{ height: "300px", overflowY: "scroll", borderStyle: "solid", borderWidth: "1px" }}>
              <UserList
                  id={"owners"}
                  header={"Owners"}
                  userList={this.props.container.owners}
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
        {status}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const container = state.container;
  return { container: container };
}
export default connect(mapStateToProps)(GroupManagementContainer);
