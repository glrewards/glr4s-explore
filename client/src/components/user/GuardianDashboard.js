import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardTitle,
  Button,
  Icon,
  Row,
  Col,
  MediaBox
} from "react-materialize";
import UserDetailContainer from "../containers-user/UserDetailContainer";
import UserListContainer from "../containers-user/UserListContainer";
import UserList from "./UserList";

class GuardianDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      console.log("GuardianDashBoard Props", this.props);
    return (
      <div>
          <Card className={"blue lighten-3"}>
          <Row className={"center-align"}> <Col s={12}>

          <h2>Guardian Dashboard</h2>

          </Col>
          </Row>
        <Row>
            <Col s ={12}>
                <UserDetailContainer user={this.props.user}/>
            </Col>

            <Col s={12}><UserListContainer user={this.props.user} /></Col>
        </Row>
          </Card>
      </div>
    );
  }
}

GuardianDashboard.propTypes = {
  user: PropTypes.object.isRequired
};

export default GuardianDashboard;
