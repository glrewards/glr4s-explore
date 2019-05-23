import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import M from "materialize-css";

class GLRSubHeader extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);
  }

  renderContent() {}

  render() {
    console.log(this.props.auth);
    return (
      <div className="nav">
        <div className="nav-wrapper blue-grey">
          <ul>
            <li>
              <a href="#test1">Homework</a>
            </li>
            <li>
              <Link to={this.props.auth ? "/shop" : "/"}>Shop</Link>
            </li>
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
          <ul id="dropdown1" className="dropdown-content">
            <li>
                <Link to={this.props.auth ? "/categories" : "/"}>Categories</Link>
            </li>
            <li>
                <Link to={this.props.auth ? "/students/all" : "/"}>All Students List</Link>
            </li>
            <li className="divider" tabIndex="-1" />
            <li>
              <a href="#!">three</a>
            </li>
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

function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps)(GLRSubHeader);
