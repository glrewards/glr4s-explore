import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
//import Payments from "./ThemeExample";

class GLRSubHeader extends Component {
  renderShopItem() {
    //make sure we have a valid user before we start using it
    if (!this.props.auth) {
      return;
    }
    switch (this.props.auth._student) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        );
    }
  }

  render() {
    return (
      <div className="nav-content orange">
        <ul className="tabs tabs-transparent">
          {this.renderShopItem()}
        </ul>
      </div>
    );
  }
}

//this is where we start referencing the user on the response as auth - it is just a name and throwback to the tutorial
function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps)(GLRSubHeader);
