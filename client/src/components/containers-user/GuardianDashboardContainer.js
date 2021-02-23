import PropTypes from "prop-types";
import React, { Component } from "react";
import {ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import GuardianDashboard from "../user/GuardianDashboard";
import {fetchRelatedMembers} from "../../actions/memberActions";
import {fetchCabinet} from "../../actions/rewardActions";
import {fetchUser} from "../../actions";


class GuardianDashboardContainer extends Component {
    constructor(props) {
        super(props);
       }
       componentDidMount() {
        //we need to retrieve the related users easiest thing might be to just populate related user info on fetch
           console.log("GuardianDashboardContainer: componentDidMount()");
           console.log(this.props);
           if (!this.props.user){
               this.props.dispatch(fetchUser());
           }else {
               console.log("GuardianDashboardContainer: componentDidMount: user exists getting related users");
               this.props.dispatch(fetchRelatedMembers(this.props.user._id));
           }
       }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.user && this.props.user !== prevProps.user) {
            const { dispatch, user } = this.props;
            dispatch(fetchRelatedMembers(user._id));
        }
    }
    render() {
        console.log("GuardianDashboardContainer: render()", this.props);
        if (!this.props.user){
            return(<ProgressBar>Refreshing</ProgressBar>);
        }
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
