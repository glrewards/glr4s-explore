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
    return (
      <div>
          <Card className={"blue lighten-3"}>
          <Row className={"center-align"}> <Col s={12}>

          <h2>Guardian Dashboard</h2>

          </Col>
          </Row>
        <Row>
            <Col s ={6}>
                <UserDetailContainer />
            </Col>

            <Col s={6}><UserListContainer /></Col>
        </Row>
          </Card>
      </div>
    );
  }
}
GuardianDashboard.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string
};

export default GuardianDashboard;
