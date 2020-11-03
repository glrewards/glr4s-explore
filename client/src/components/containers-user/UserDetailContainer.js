import React, { Component } from "react";
import { connect } from "react-redux";
import UserDetailCard from "../user/UserDetailCard";
import PropTypes from "prop-types";



class UserDetailContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.log(this.props);
        if (this.props.user) {
            //this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
            //this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
        }
    }

    render() {
        if (!this.props.user){
            return (
                <div> no user data</div>
            )
        }
        return(
            <UserDetailCard
                id={this.props.user._id}
                firstName={this.props.user.firstName}
                lastName={this.props.user.lastName}
                userName={this.props.user.userName}
                email={this.props.user.email}
                address={this.props.user.address}
            />
        )
    }
}

function mapStateToProps(state) {
    //the current user
    let user = state.auth;
    return {user};
}

UserDetailContainer.propTypes = {
    user: PropTypes.object.isRequired

};
export default connect(mapStateToProps)(UserDetailContainer);
