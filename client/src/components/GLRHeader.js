import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";
import GLRSubHeader from "./GLRSubHeader";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    M.AutoInit();
    this.renderContentSub = this.renderContentSub.bind(this);
    this.renderCartLink = this.renderCartLink.bind(this);
    this.renderContentTop = this.renderContentTop.bind(this);
    this.renderAdminItem = this.renderAdminItem.bind(this);
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
          <li key={side + "0"}>
            <a href="/auth/google"><h6>Login with Google</h6></a>
          </li>
        );
      default:
        return [
          <li key={side + "0"} className="left">
            <Link to={this.props.auth ? "/surveys" : "/"}>
              <h6>GLR4S - DEV</h6>
            </Link>{" "}
          </li>,
          this.renderCartLink(),
          <li key={side + "1"} style={{ margin: "0 10px" }}>
            <h6>{this.renderGLRPoints()}</h6>
          </li>,
          <li key={side + "2"}>
            <h6><a href="/api/logout">Logout</a></h6>
          </li>,
          this.renderAdminItem()
        ];
    }
  }

  renderContentSub() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        //console.log(this.props);
        return;
      default:
        return <GLRSubHeader />;
    }
  }

  renderAdminItem() {
    if (!this.props.auth.isAdmin) {

    } else {
      return (
        <li key="admin-drop">
          <Link to="/admin">
            <h6>Admin</h6>
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="nav-extended flow-text">
          <div className="nav-wrapper orange">
            <ul>
              {this.renderContentTop("t")}
            </ul>
          </div>
          {this.renderContentSub()}
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
