
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserSelect from "../user/UserSelect";
import {fetchCabinet, invalidateCabinet} from "../../actions/rewardActions";

class UserSelectContainer extends Component {
    constructor(props) {
        super(props);
        this.handleRelatedSelected = this.handleRelatedSelected.bind(this);
    }
    componentDidMount() {
        //console.log(this.props.userList);
    }
    handleRelatedSelected(){
        console.log("ere");
    }
    render() {
        if (!this.props.userList){
            return (
                <div> no user data</div>
            )
        }
        return(
            <UserSelect userList = {this.props.userList} onUserSelected={this.handleRelatedSelected}
            />
        )

    }
}

function mapStateToProps(state) {
    let user = state.auth;
    let userList = null;
    if (user){
        userList = state.auth._relatedUserIds;
    }
    return {user,userList};
}

UserSelectContainer.propTypes = {
    userList: PropTypes.array.isRequired

}
export default connect(mapStateToProps)(UserSelectContainer);
