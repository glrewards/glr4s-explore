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
import UserSelectContainer from "../containers-user/UserSelectContainer";
import MemberCardContainer from "../containers-rewards/MemberCardContainer";
import MemberOrderContainer from "../containers-rewards/MemberOrderContainer";

class GuardianDashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log("GuardianDashBoard Props", this.props);
      console.log("GuardianDashboard: render()");
      console.log(this.props);
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
              <UserSelectContainer user={this.props.user} related={this.props.related} />
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
                  <MemberCardContainer />
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
                  <MemberOrderContainer >
                    Order Line Items
                  </MemberOrderContainer>
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
  user: PropTypes.object.isRequired,
    related: PropTypes.array
};

export default GuardianDashboard;
