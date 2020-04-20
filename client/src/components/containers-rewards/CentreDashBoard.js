import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteLineItems, fetchOrder, invalidateOrder, lineItemsDelete} from "../../actions/orderActions";
import OrderSummary from "../rewards/OrderSummary";
import OrderDetails from "../rewards/OrderDetails";
import OrderDetailCommands from "../rewards/OrderDetailCommands";
import PropTypes from "prop-types";
import {ProgressBar} from "react-materialize";

class CentreDashBoard extends Component {
  constructor(props) {
    super(props);
    this.calcTotalLines = this.calcTotalLines.bind(this);
    this.calcMostOrdered = this.calcMostOrdered.bind(this);
    this.calcTotalCards = this.calcTotalCards.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
  }

  handleDeleteClicked(event) {
    // because this is the admin dashboard we could be deleting items for any kid s0
    //we need to record the student id and the items. this will mean we have to add
    // more logic to the action in order to fire a call to the server for each child
    //this keeps the route logic simple but might not be the best solution
    //longer term.
    if (!event.target) return;
    let lineId = event.nativeEvent.target.value;
    let checked = event.nativeEvent.target.checked;
    //need to get the student from the line
    let studentLines = this.props.orderDetail.lineItems.filter(
      item => item._id === lineId
    );
    //check we only got one line
    if(studentLines.length > 1){
      console.log("error: found more than one line");
      return;
    }
    this.props.dispatch(lineItemsDelete(studentLines[0]._student, checked, lineId));
  }

  handleDeletePost() {
    this.props.dispatch(
      //need tp fire delete line items for each student

      deleteLineItems(
        this.props.user._learningCentreId,
        this.props.user._student._id,
        this.props.deletes
      )
    );
  }
  calcTotalCards() {
    Array.prototype.calcTotalPoints = function(prop) {
      let total = 0;
      for (let i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop] * this[i]["quantity"];
      }
      return total;
    };
    //loop throuh line items and sum
    if (this.props.orderDetail) {
      let total = this.props.orderDetail.lineItems.calcTotalPoints("glrpoints");
      return total;
    } else {
      return 0;
    }
  }
  calcTotalLines() {
    if (this.props.orderDetail) {
      return this.props.orderDetail.lineItems.length;
    } else {
      return 0;
    }
  }
  calcMostOrdered() {
    return "Pin Badge";
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.dispatch(invalidateOrder(this.props.user._learningCentreId));
      this.props.dispatch(fetchOrder(this.props.user._learningCentreId));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && this.props.user !== prevProps.user) {
      const { dispatch, user } = this.props;
      dispatch(fetchOrder(user._learningCentreId));
    }
  }
  render() {
    const { user, orderDetail, isFetching } = this.props;
    if (!user) return <ProgressBar />;
    return (
      <div>
        {isFetching && JSON.stringify(orderDetail) === JSON.stringify({}) && (
          <ProgressBar />
        )}
        {!isFetching && JSON.stringify(orderDetail) === JSON.stringify({}) && (
          <h2>No Order</h2>
        )}
        {JSON.stringify(orderDetail) !== JSON.stringify({}) && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <OrderSummary
              mostPopular={this.calcMostOrdered()}
              totalLines={this.calcTotalLines()}
              totalLizardCards={this.calcTotalCards()}
            />
            <OrderDetailCommands deleteClick={this.handleDeletePost} />
            <OrderDetails
              lineItems={this.props.orderDetail.lineItems}
              onDeleteClicked={this.handleDeleteClicked}
            />
          </div>
        )}
      </div>
    );
  }
}

CentreDashBoard.propTypes = {
  centre: PropTypes.string.isRequired,
  orderDetail: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { order } = state;
  const { isFetching, lastUpdated, orderDetail, adminDeletes } = order || {
    isFetching: true
  };
  let user = state.auth;
  return {
    user,
    adminDeletes,
    orderDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(CentreDashBoard);
