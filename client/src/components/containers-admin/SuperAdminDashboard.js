import OrderListContainer from "../containers-rewards/OrderListContainer";
import {connect} from "react-redux";
import React, {Component} from "react";
export default class SuperAdminDashboard extends Component {
    render() {
        return (
            <div>
                <OrderListContainer />
            </div>
        )
    }
}

