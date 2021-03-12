import OrderListContainer from "../containers-rewards/OrderListContainer";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Button, TextInput, Row, Col, Icon, Select } from "react-materialize";
import PropTypes from "prop-types";
import LineItemTableContainer from "../containers-rewards/LineItemTableContainer";
class SuperAdminDashboard extends Component {
  handleOrderListClicked(event) {
    console.log("super admin dashboard: " + event.nativeEvent.target.id);
  }

  render() {
    return (
      <div>
        <Row> </Row>
        <Row>
          <form name="searchForm"
                id="searchForm"
            onSubmit={e => {
              e.preventDefault();
              this.props.onSubmitSearch(e);
            }}
          >
            <Col offset="s3" s={2}>
              <TextInput
                type="search"
                icon="local_library"
                id={"name"}
                label="Centre Name"
                onChange={event => {
                  this.props.onSearch(event);
                }}
              />
            </Col>
            <Col s={2}>
              <TextInput
                type="search"
                icon="local_library"
                id={"centreId"}
                label="Centre ID"
                onChange={event => {
                  this.props.onSearch(event);
                }}
              />
            </Col>
            <Col s={2}>
              <Select
                id={"fulfillStatus"}
                value=""
                onChange={event => {this.props.onSearch(event)}}
                options={{
                  dropdownOptions: {
                    alignment: "left",
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                  }
                }}
              >
                <option disabled value="">
                  {" "}
                  Status
                </option>
                <option value="unfulfilled">unfulfilled</option>
                <option value="fulfilling">fulfilling</option>
                <option value="fulfilled">fulfilled</option>
              </Select>
            </Col>
            <Col>
              <Button waves={"light"}>
                <Icon>search</Icon>Search
              </Button>
            </Col>
          </form>
        </Row>
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
  orderStatus: PropTypes.string,
  orderList: PropTypes.array,
  onOrderLineClicked: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(SuperAdminDashboard);
