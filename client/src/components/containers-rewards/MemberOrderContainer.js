import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLineItems, invalidateOrder } from "../../actions/orderActions";
import OrderDetails from "../rewards/OrderDetails";
import PropTypes from "prop-types";
import { ProgressBar } from "react-materialize";

class MemberOrderContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user) {
            let centre = this.props.user._learningCentreId;
            let studentId = this.props.user._student._id;
            this.props.dispatch(invalidateOrder(centre));
            this.props.dispatch(fetchLineItems(centre,studentId));
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user && this.props.user !== prevProps.user) {
            const { dispatch, user } = this.props;
            let centre = user._learningCentreId;
            let studentId = user._student._id;
            dispatch(fetchLineItems(centre,studentId));
        }
    }
    render() {

        const { user, orderDetail, isFetching } = this.props;
        console.log(orderDetail);
        if (!orderDetail) return <ProgressBar />;
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
                        <OrderDetails lineItems={this.props.orderDetail} />
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
export default connect(mapStateToProps)(MemberOrderContainer);
