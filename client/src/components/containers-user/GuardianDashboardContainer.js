import PropTypes from "prop-types";
import React, { Component } from "react";
import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import GuardianDashboard from "../user/GuardianDashboard";
import {fetchRelatedMembers} from "../../actions/memberActions";
import {fetchCabinet} from "../../actions/rewardActions";


class GuardianDashboardContainer extends Component {
    constructor(props) {
        super(props);
       }
       componentDidMount() {
        //we need to retrieve the related users easiest thing might be to just populate related user info on fetch
           console.log(this.props);
           this.props.dispatch(fetchRelatedMembers(this.props.user._id));
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
    let related = state.members;
    let selected = state.ui.selectedmember;
    return {user,related, selected};
}

GuardianDashboardContainer.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func

};

export default connect(mapStateToProps)(GuardianDashboardContainer);
