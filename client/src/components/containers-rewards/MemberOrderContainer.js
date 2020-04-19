import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchLineItems,
  invalidateOrder,
  lineItemsDelete,
  deleteLineItems
} from "../../actions/orderActions";
import OrderDetails from "../rewards/OrderDetails";
import PropTypes from "prop-types";
import { ProgressBar } from "react-materialize";
import OrderDetailCommands from "../rewards/OrderDetailCommands";

class MemberOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      let centre = this.props.user._learningCentreId;
      let studentId = this.props.user._student._id;
      this.props.dispatch(invalidateOrder(centre));
      this.props.dispatch(fetchLineItems(centre, studentId));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //this should not fire if I am just updating the delete checkbox
    if (this.props.user && this.props.user !== prevProps.user) {
      const { dispatch, user } = this.props;
      let centre = user._learningCentreId;
      let studentId = user._student._id;
      dispatch(fetchLineItems(centre, studentId));
    }
  }

  handleDeleteClicked(event) {
    console.log(event.nativeEvent.target.checked);
    this.props.dispatch(
      lineItemsDelete(
        event.nativeEvent.target.checked,
        event.nativeEvent.target.value
      )
    );
  }

  handleDeletePost() {
    this.props.dispatch(
      deleteLineItems(
        this.props.user._learningCentreId,
        this.props.user._student._id,
        this.props.deletes
      )
    );
  }

  render() {
    const { user, orderDetail, isFetching } = this.props;
    if (!orderDetail) return <ProgressBar />;
    return (
      <div>
        {isFetching && JSON.stringify(orderDetail) === JSON.stringify({}) && (
          <ProgressBar />
        )}
        {!isFetching && JSON.stringify(orderDetail) === JSON.stringify({}) && (
          <ProgressBar />
        )}
        {JSON.stringify(orderDetail) !== JSON.stringify({}) && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <OrderDetailCommands deleteClick={this.handleDeletePost} />
            <OrderDetails
              lineItems={this.props.orderDetail}
              onDeleteClicked={this.handleDeleteClicked}
            />
          </div>
        )}
      </div>
    );
  }
}

MemberOrderContainer.propTypes = {
  centre: PropTypes.string,
  orderDetail: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { order } = state;
  const { isFetching, lastUpdated, orderDetail, deletes } = order || {
    isFetching: true
  };
  let user = state.auth;
  return {
    user,
    deletes,
    orderDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(MemberOrderContainer);
