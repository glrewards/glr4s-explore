import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder, invalidateOrder } from "../../actions/orderActions";
import PropTypes from "prop-types";

class CentreDashBoard extends Component {
  constructor(props) {
    super(props);
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
    return <div>Centre dashboard</div>;
  }
  /*
        const { user, cabDetail, isFetching, lastUpdated } = this.props;
        if(!user) return(<div>Fetching</div>);
        return (
            <div>
                <div>
                    {isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>Loading</h2> }
                    {!isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>No Cabinet</h2> }
                    {(JSON.stringify(cabDetail) !== JSON.stringify({})) &&(
                        <div style={{opacity: isFetching ? 0.5:1}}>
                            <ShelfList shelves={cabDetail.shelves}
                                       onAddToCartClickShelf={this.handleAddToCartClick}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
         */
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
  const { isFetching, lastUpdated, orderDetail } = order || {
    isFetching: true
  };
  let user = state.auth;
  return {
    user,
    orderDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(CentreDashBoard);
