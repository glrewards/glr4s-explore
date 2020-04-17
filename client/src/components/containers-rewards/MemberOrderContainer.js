import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrder, invalidateOrder } from "../../actions/orderActions";
import OrderSummary from "../rewards/OrderSummary";
import OrderDetails from "../rewards/OrderDetails";
import PropTypes from "prop-types";
import { ProgressBar } from "react-materialize";

class MemberOrderContainer extends Component {
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
                        <OrderDetails lineItems={this.props.orderDetail.lineItems} />
                    </div>
                )}
            </div>
        );
    }
}

MemberOrderContainer.propTypes = {
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
