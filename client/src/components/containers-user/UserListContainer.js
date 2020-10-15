/* this container is used to fetch and display summary info for an array of users based on some query params
for example a list of users in a given centre or a list of users related to a given user eg a guardian list of related
 members.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
//import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import UserList from "../user/UserList";
import {fetchCabinet, invalidateCabinet} from "../../actions/rewardActions";

class UserListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleRelatedSelected = this.handleRelatedSelected.bind(this);
    }
    componentDidMount() {
        console.log(this.props.userList);
    }
    handleRelatedSelected(event){
        console.log(event.target);
    }
    render() {
        if (!this.props.userList){
            return (
                <div> no user data</div>
            )
        }
          return(
                <UserList onUserSelected={this.handleRelatedSelected}
                    userList = {this.props.userList}
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

UserListContainer.propTypes = {
    userList: PropTypes.array.isRequired

}
export default connect(mapStateToProps)(UserListContainer);
