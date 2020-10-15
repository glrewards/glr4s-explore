import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Row,
  Col,
  Tab,
  Tabs,
    Select
} from "react-materialize";
import UserDetailContainer from "../containers-user/UserDetailContainer";
import UserListContainer from "../containers-user/UserListContainer";
import UserSelectContainer from "../containers-user/UserSelectContainer";
import GuardianMemberOrderContainer from "../containers-rewards/GuardianMemberOrderContainer";

class GuardianDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log("GuardianDashBoard Props", this.props);
    return (
      <div>
        <Card className={"blue lighten-3"}>
          <Row>
            <Col s={12}>
              <UserDetailContainer user={this.props.user} />
            </Col>
          </Row>
          <Row>
            <Col s={4}>
              <UserSelectContainer user={this.props.user} />
            </Col>
            <Col s={8}>
              <Tabs className="tabs-transparent blue">
                <Tab
                  className="white-text"
                  options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                  }}
                  title="User Details"
                >
                  Member Details Card Here
                </Tab>
                <Tab
                  className="white-text"
                  options={{
                    duration: 300,
                    onShow: null,
                    responsiveThreshold: Infinity,
                    swipeable: false
                  }}
                  title="Order"
                >
                  <GuardianMemberOrderContainer>
                    here
                  </GuardianMemberOrderContainer>
                </Tab>
                <Tab className="white-text"
                     options={{
                       duration: 300,
                       onShow: null,
                       responsiveThreshold: Infinity,
                       swipeable: false
                     }}
                     title="Favourites">User favourites shown here</Tab>
              </Tabs>
            </Col>
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
