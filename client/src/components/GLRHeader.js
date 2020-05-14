import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Icon, Navbar, NavItem} from "react-materialize";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.renderCartLink = this.renderCartLink.bind(this);
    this.renderContentTop = this.renderContentTop.bind(this);
    this.renderAdminItem = this.renderAdminItem.bind(this);
    this.renderGLRPoints = this.renderGLRPoints.bind(this);
  }
  componentDidMount() {}

  renderCartLink() {
    if (this.props.cart.length > 0) {
      console.log(this.props.cart);
      return (
        <NavItem className={"sidenav-close"}>
          <NavLink to={"/shop/cart"} key={"cart"}>
            <span>
              <Icon className="material-icons right">shopping_basket</Icon>
              New Basket
            </span>
          </NavLink>
        </NavItem>
      );
    }
  }

  renderGLRPoints() {
    if (this.props.auth._student) {
      return (
        this.props.auth.username +
        ": Lizard Cards: " +
        this.props.auth._student.currentPoints
      );
    } else {
      return "No Lizard Cards";
    }
  }
  renderMyOrder() {
    if (this.props.auth.roles.includes("member")){
    return(
            <NavItem key={"lineItems"} className="sidenav-close">
              <NavLink to={"/lineitems"}>My Order</NavLink>
            </NavItem>
      );
    }
  }

  renderContentTop(side) {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        //console.log(this.props);
        return null;
      default:
        return [
          <NavItem key={"rewards"} className="sidenav-close">
            <NavLink to={"/rewards"}>Reward Cabinet</NavLink>
          </NavItem>,
          this.renderMyOrder(),
          <NavItem href="/api/logout" key={"logout"}>
            Logout
          </NavItem>,
          this.renderAdminItem(),
          this.renderCartLink(),
          <NavItem key={"points"}>
            <div className="valign-wrapper flow-text">
              {this.renderGLRPoints()}
            </div>
          </NavItem>
        ];
    }
  }

  renderAdminItem() {
    if (!this.props.auth.roles.includes("admin")) {
    } else {
      return (
        <NavItem key={"admin"} className="sidenav-close">
          <Link to="/admin">Admin Dashboard</Link>
        </NavItem>
      );
    }
  }

  render() {
    return (
      <Navbar
        style={{ margin: 5 }}
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
      >
        {this.renderContentTop("t")}
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
