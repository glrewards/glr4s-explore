import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, NavItem, Icon } from "react-materialize";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderCartLink = this.renderCartLink.bind(this);
    this.renderContentTop = this.renderContentTop.bind(this);
    this.renderAdminItem = this.renderAdminItem.bind(this);
    this.renderGLRPoints = this.renderGLRPoints.bind(this);
  }
  componentDidMount() {}

  renderCartLink() {
    if (this.props.cart.length > 0) {
      return (
        <NavItem href="/shop/cart">
          <i className="material-icons">shopping_basket</i>
        </NavItem>
      );
    }
  }

  renderGLRPoints() {
    if (this.props.auth._student) {
      return this.props.auth.username + ": Lizard Cards: " + this.props.auth._student.currentPoints;
    } else {
      return "No GLR Points Found";
    }
  }

  renderContentTop(side) {
    let importedELImage = require("../images/explore-learning.png");
    switch (this.props.auth) {
      case null:
        return;
      case false:
        //console.log(this.props);
        return ( null
        );
      default:
        return [
          <NavItem href='/rewards' className="hide-on-small-and-down">
            Reward Cabinet
          </NavItem>,
          this.renderCartLink(),

          <NavItem href="/api/logout" className="hide-on-small-and-down">
            Logout
          </NavItem>,
          <NavItem href="/shop"  className="hide-on-small-and-down">
            Student Shop
          </NavItem>,
          this.renderAdminItem(),
          <NavItem  className="hide-on-small-and-down text-capitalize">
            <div className="valign-wrapper flow-text">{this.renderGLRPoints()}</div>
          </NavItem>
        ];
    }
  }

  renderAdminItem() {
    if (!this.props.auth.isAdmin) {
    } else {
      return (
        <NavItem  className="hide-on-small-and-down">
          <Link to="/admin">Admin Dashboard</Link>
        </NavItem>
      );
    }
  }

  render() {
    let importedELImage = require("../images/explore-learning.png");
    return (

        <Navbar style={{margin: 5}}
          className="blue darken-2 flow-text"
                centreChildren
          alignLinks="right"
                brand={<a href={"#"}>Explore Rewards</a>}
          id="mobile-nav"
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: false,
            edge: "left",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
        >{this.renderContentTop("t")}
        </Navbar>

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
