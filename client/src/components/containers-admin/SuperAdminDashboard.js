import OrderListContainer from "../containers-rewards/OrderListContainer";
import {connect} from "react-redux";
import React, {Component} from "react";
class SuperAdminDashboard extends Component {
    render() {
        return (
            <div>
               <OrderListContainer orderStatus={'unfulfilled'}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
 return {}
}

export default connect(mapStateToProps)(SuperAdminDashboard);
