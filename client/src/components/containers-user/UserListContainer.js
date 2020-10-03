/* this container is used to fetch and display summary info for an array of users based on some query params
for example a list of users in a given centre or a list of users related to a given user eg a guardian list of related
 members.
 */

import React, { Component } from "react";
//import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import UserList from "../user/UserList";
import {fetchCabinet, invalidateCabinet} from "../../actions/rewardActions";

class UserListContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.user) {
            // we need to retrieve the user details for each related use

        }
    }
    render() {
        if (!this.props.user){
            return (
                <div> no user data</div>
            )
        }
        return(
            <UserList
                id={"ererwr243545432"}
                firstName={"john"}
                lastName={"doe"}
                userName={"jdoe"}
                email={"jdoe@exxample.com"}
                address={"120 acacia avenue"}
                relatedUsers={{}}
            />
        )
    }
}

function mapStateToProps(state) {
    let user = state.auth;
    return user;
}
export default connect(mapStateToProps)(UserListContainer);
