import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProgressBar, Row} from "react-materialize";
import SuperAdminDashboard from "../admin/SuperAdminDashboard";

class SuperAdminDashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.handleOrderLineClicked = this.handleOrderLineClicked.bind(this);
    }
    handleOrderLineClicked(event){
        console.log("magic");
    }
    render(){
        return(
            <SuperAdminDashboard onOrderLineClicked={this.handleOrderLineClicked}/>
        )
    }
}
function mapStateToProps(state) {
 return {}
}

export default connect(mapStateToProps)(SuperAdminDashboardContainer);
