import React, { Component } from "react";
//import {Row, Col, CardTitle, ProgressBar} from "react-materialize";
import { connect } from "react-redux";
import UserDetailCard from "../user/UserDetailCard";


class UserDetailContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <UserDetailCard
                id={"ererwr243545432"}
                firstName={"john"}
                lastName={"doe"}
                userName={"jdoe"}
                email={"jdoe@exxample.com"}
                address={"120 acacia avenue"}
                relatedUsers={[]}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
}
export default connect(mapStateToProps)(UserDetailContainer);
