import PropTypes from "prop-types";
import React, { Component } from "react";
import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import GuardianDashboard from "../user/GuardianDashboard";


class GuardianDashboardContainer extends Component {
    constructor(props) {
        super(props);
       }
       componentDidMount() {
        //we need to retrieve the related users easiest thing might be to just populate related user info on fetch
       }

    render() {
        console.log("GuardianDashboardContainer", this.props);
        return(
            <GuardianDashboard user={this.props.user}/>
        )
       }
}

function mapStateToProps(state) {
    //the current user
    let user = state.auth;
    return {user};
}

GuardianDashboardContainer.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(GuardianDashboardContainer);
