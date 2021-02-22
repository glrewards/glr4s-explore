import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserSelect from "../user/UserSelect";
import * as UIActions from "../../actions/UIActions";
import { bindActionCreators } from "redux";
import {ProgressBar} from "react-materialize";

class UserSelectContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRelatedSelected = this.handleRelatedSelected.bind(this);
  }
  componentDidMount() {
    console.log("UserSelectContainer: componentDidMount()");
  }

  handleRelatedSelected(e) {
    console.log("userSelectedContainer: handleRelatedSelected" + e.target.value);
  }

  render() {
    console.log("userSelectContainer: render() ");
    console.log(this.props);
    if (!this.props.related) {
      return <ProgressBar> no user data</ProgressBar>;
    }
    return (
      <UserSelect
        userList={this.props.related}
        selected={this.props.selected}
        selectUser={this.props.actions.selectUser}
      />
    );
  }
}

function mapStateToProps(state) {
  let user = state.auth;
  let related = state.members;
  let selected = state.ui.selectedmember;
  return { user, related, selected };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Object.assign({}, UIActions), dispatch)
});

UserSelectContainer.propTypes = {
  user: PropTypes.object.isRequired,
  related: PropTypes.array,
  selected: PropTypes.string,
  actions: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSelectContainer);
