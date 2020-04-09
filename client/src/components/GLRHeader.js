import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    M.AutoInit();
    this.renderCartLink = this.renderCartLink.bind(this);
    this.renderContentTop = this.renderContentTop.bind(this);
    this.renderAdminItem = this.renderAdminItem.bind(this);
    this.renderGLRPoints = this.renderGLRPoints.bind(this);
  }
  componentDidMount() {
    M.AutoInit();
  }

  renderCartLink() {
    if (this.props.cart.length > 0) {
      return (
        <li key="cart" style={{ margin: "0 10px" }}>
          <Link to="/shop/cart">
            <i className="material-icons">shopping_basket</i>{" "}
          </Link>
        </li>
      );
    }
  }

  renderGLRPoints() {
    if (this.props.auth._student) {
      return "GLRPoints: " + this.props.auth._student.currentPoints;
    } else {
      return "No GLR Points Found";
    }
  }


  renderContentTop(side) {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        //console.log(this.props);
        return (
          <li key={side + "google"}>
            <a href={"/auth/google"}>Login with Google</a>
          </li>
        );
      default:
        return [
          <li key={side + "0"} className="left">
            <Link to={this.props.auth ? "/surveys" : "/"}>
              GLR4S - DEV
            </Link>
          </li>,
          <li key="rewards">
            <Link to={'/rewards'}>
              Reward Cabinet
            </Link>
          </li>,
          this.renderCartLink(),

          <li key={side + "2"}>
            <a href={"/api/logout"}>Logout</a>
          </li>,
            <li key={side + "3"}> <Link to="/shop">Student Shop</Link>
            </li>,
          this.renderAdminItem(),
          <li key={side + "1"}  className="right">
            {this.renderGLRPoints()}
          </li>
        ]
    }
  }

  renderAdminItem() {
    if (!this.props.auth.isAdmin) {

    } else {
      return (
        <li key="admin">
          <Link to="/admin">
            Admin Dashboard
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="nav-extended flow-text">
          <div className="nav-wrapper light-blue darken-1">
            <ul>
              {this.renderContentTop("t")}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps)(GLRHeader);
