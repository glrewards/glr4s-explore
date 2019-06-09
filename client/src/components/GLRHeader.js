import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";
import GLRSubHeader from "./GLRSubHeader";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
}
  componentDidMount() {

    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);
    M.AutoInit();

  }

  renderCartLink(){
    if(this.props.cart.length > 0){
      return (<li key="cart"style={{ margin: "0 10px" }}><i className="material-icons">shopping_basket</i> </li>);
    }
  }

  renderGLRPoints(){
    if(this.props.auth._student){
      return "GLRPoints: " + this.props.auth._student.currentPoints;

    }else{
      return "No GLR Points Found";
    }

  }

  renderProfileMenu() {
    if(this.props.auth._student){
      return (<li key="profile" style={{ margin: "0 10px" }}>Profile</li>);

    }
  }

  renderContentTop(side) {
    console.log("component did render",this.props);
    switch (this.props.auth) {
      case null:
        return;
      case false:
        //console.log(this.props);
        return (
          <li key={side + "0"}>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
            this.renderCartLink(),
          <li key={side + "1"} style={{ margin: "0 10px" }}>
            {this.renderGLRPoints()}
          </li>,
          <li key={side + "2"}>
            <a href="/api/logout">Logout</a>
          </li>,
          this.renderProfileMenu(),
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

  render() {
    return (
        <div>
          <nav className="nav">
            <div className="nav-wrapper orange">
              <Link to={this.props.auth ? "/surveys" : "/"} className="left">
                GLR4S - DEV
              </Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.renderContentTop("t")}
              </ul>
                <div>
                    <ul>{this.renderContentSub()}</ul>
                </div>
            </div>

          </nav>

          <ul className="sidenav" id="mobile-demo">
            {this.renderContentTop("m")}
          </ul>

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
