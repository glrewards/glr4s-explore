import React, { Component } from "react";
import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import GuardianDashboard from "../user/GuardianDashboard";


class GuardianDashboardContainer extends Component {
    constructor(props) {
        super(props);
       }

       render() {
        return(
            <GuardianDashboard></GuardianDashboard>
        )
       }
}

function mapStateToProps(state, ownProps) {
}
export default connect(mapStateToProps)(GuardianDashboardContainer);
