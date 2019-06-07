import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import M from "materialize-css";
//import Payments from "./ThemeExample";

class GLRSubHeader extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);
  }

  renderShopItem() {
    //make sure we have a valid user before we start using it
    if(!this.props.auth){
      return;
    }
    switch (this.props.auth._student) {
      case null:
        return;
      case false:
        console.log("no student role linked to this user");
        return;
      default:
        return(
          <li>
            <Link to="/shop">Shop</Link>
          </li>);
    }
  }

  render() {
    return (
      <div className="nav">
        <div className="nav-wrapper orange">
          <ul>
            <li>
              <a href="#test1">Homework</a>
            </li>
            {this.renderShopItem()}
            <li>
              <Link to={this.props.auth ? "/categories" : "/"}>Admin</Link>
            </li>
            <li>
              <a href="">School Shop</a>
            </li>
            <li>
              <a
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown1"
                data-beloworigin="true"
              >
                New Admin<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul id="dropdown1" className="dropdown-content orange">
            <li>
                <Link to={this.props.auth ? "/categories" : "/"}>Categories</Link>
            </li>
            <li>
                <Link to={this.props.auth ? "/students/all" : "/"}>All Students List</Link>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <a href="#!">
                <i className="material-icons">view_module</i>four
              </a>
            </li>
            <li>
              <a href="#!">
                <i className="material-icons">cloud</i>five
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

//this is where we start referencing the user on the response as auth - it is just a name and throwback to the tutorial
function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps)(GLRSubHeader);
