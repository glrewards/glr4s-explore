import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { submitLogin, fetchUser, submitLineItems } from "../../actions";
//import {fetchCategories} from "../../actions";
import { connect } from "react-redux";
import { deleteAllLines } from "../../actions/cartActions";
import {Redirect} from "react-router-dom";

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = values => {
    this.props.submitLogin(values);
    //this.props.fetchUser();
  };

    /**
     * This is an important function this redirects to the right page for the roles
     * @returns {JSX.Element}
     */
  renderContent() {
      if((this.props.user)&&(!this.props.user.roles.includes("glradmin"))){
      return <Redirect to="/cabinet" />;
    }else if((this.props.user)&&(this.props.user.roles.includes("glradmin"))){
          console.log("redirect to admin");
          return <Redirect to="/glradmin" />;
      } else {
        return (
            <div>
                <LoginForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  console.log(state);
  return { actions: state.actions, user: state.auth };
}

export default connect(
  mapStateToProps,
  { submitLogin, fetchUser }
)(LoginFormContainer);
