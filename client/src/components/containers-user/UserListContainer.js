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
    }
    componentDidMount() {
        console.log(this.props.userList);
    }
    render() {
        if (!this.props.userList){
            return (
                <div> no user data</div>
            )
        }
          return(
                <UserList
                    userList = {this.props.userList}
                />
          )

    }
}

function mapStateToProps(state) {
    let userList = state.auth._relatedUserIds;
    return {userList};
}

UserListContainer.propTypes = {
    userList: PropTypes.array.isRequired

}
export default connect(mapStateToProps)(UserListContainer);
