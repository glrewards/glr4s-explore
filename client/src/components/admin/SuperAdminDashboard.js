import OrderListContainer from "../containers-rewards/OrderListContainer";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Button, TextInput, Row, Col,Icon } from "react-materialize";
import PropTypes from "prop-types";
import LineItemTableContainer from "../containers-rewards/LineItemTableContainer";
class SuperAdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  handleOrderListClicked(event) {
    console.log("super admin dashboard: " + event.nativeEvent.target.id);
  }
  render() {
    return (
      <div>
        <Row> </Row>
        <form>
          <Row>
            <Col offset="s6">
              <TextInput
                icon="local_library"
                id={"ti_search"}
                label="Centre Name"
              />
              <Button ><Icon>search</Icon>Search</Button>
            </Col>
          </Row>
        </form>
        <Row>
          <Col s={12}>
            <OrderListContainer
              orderStatus={"unfulfilled"}
              orderList={[]}
              onLineClicked={this.props.onOrderLineClicked}
            />
          </Col>
        </Row>
        <Row>
          <Col s={12}>
            <LineItemTableContainer>Line Item Table</LineItemTableContainer>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

SuperAdminDashboard.propTypes = {
  orderStatus: PropTypes.string.isRequired,
  orderList: PropTypes.array.isRequired,
  onOrderLineClicked: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(SuperAdminDashboard);
