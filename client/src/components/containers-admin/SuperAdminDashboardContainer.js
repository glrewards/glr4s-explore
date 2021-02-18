import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProgressBar, Row} from "react-materialize";
import SuperAdminDashboard from "./SuperAdminDashboard";

class SuperAdminDashboardContainer extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <SuperAdminDashboard />
        )
    }
}
function mapStateToProps(state) {

}

export default connect(mapStateToProps)(SuperAdminDashboardContainer);
