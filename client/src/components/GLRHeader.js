import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {Divider, Dropdown, Icon, Navbar, NavItem} from "react-materialize";

class GLRHeader extends Component {
  constructor(props) {
    super(props);
    this.renderCartLink = this.renderCartLink.bind(this);
    this.renderContentTop = this.renderContentTop.bind(this);
    this.renderAdminItem = this.renderAdminItem.bind(this);
    this.renderGLRPoints = this.renderGLRPoints.bind(this);
    this.renderSuperAdmin = this.renderSuperAdmin.bind(this);
    this.renderRewardCabinet = this.renderRewardCabinet.bind(this);
  }
  componentDidMount() {}

  renderCartLink() {
    if (this.props.cart.length > 0) {
      console.log(this.props.cart);
      return (
        //<NavItem className={"sidenav-close"}>
          <NavLink to={"/shop/cart"} key={"cart"}>
            <span>
              <Icon className="material-icons right">shopping_basket</Icon>
              New Basket
            </span>
          </NavLink>
        //</NavItem>
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
    if (this.props.auth.roles.includes("member")) {
      return (
        //<NavItem key={"lineItems"} className="sidenav-close">
          <NavLink to={"/lineitems"}>Orders</NavLink>
        //</NavItem>
      );
    }
  }
  renderGuardian() {
    if (this.props.auth.roles.includes("guardian")) {
      return (

        //<NavItem key={"guardian"} className="sidenav-close">
          <NavLink to={"/guardian"}>Guardian Board</NavLink>
       // </NavItem>

          //<NavItem key={"guardian"} href="/guardian" className="sidenav-close">Guardian Board </NavItem>
      );
    }
  }
  renderSuperAdmin() {
    if (this.props.auth.roles.includes("glradmin")) {
      return (
        //<NavItem key={"glradmin"} className="sidenav-close">
          <NavLink to={"/glradmin"}>Admin Dashboard</NavLink>
       // </NavItem>

          //<NavItem key={"glradmin"} href="glradmin" className="sidenav-close">Admin Dashboard </NavItem>
      );
    }
  }
  renderRewardCabinet() {
    if (
      this.props.auth.roles.some(role => {
        return ["admin", "member", "guardian"].includes(role);
      })
    ) {
      return (
        //<NavItem key={"cabinet"} className="sidenav-close">
          <NavLink to={"/cabinet"}>Reward Cabinet</NavLink>
        //</NavItem>
          //<NavItem key={"cabinet"} href="cabinet" className="sidenav-close">Reward Cabinet </NavItem>
      );
    }
  }
  renderContentTop(side) {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return null;
      default:
        return [
          this.renderRewardCabinet(),
          this.renderMyOrder(),
          this.renderGuardian(),
          this.renderAdminItem(),
          this.renderSuperAdmin(),
          this.renderCartLink(),
          <NavItem key={"points"}>
            <div className="valign-wrapper flow-text">
              {this.renderGLRPoints()}
            </div>
          </NavItem>,
          <NavItem href="/api/logout" key={"logout"}>
            Logout
          </NavItem>
        ];
    }
  }

  renderAdminItem() {
    if (!this.props.auth.roles.includes("admin")) {
    } else {
      return (
        [
          <Dropdown
              id="dd_admin_1"
              options={{
                alignment: 'left',
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                container: null,
                coverTrigger: false,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250
              }}
              trigger={<a href="#!">Admin{' '}<Icon right>arrow_drop_down</Icon></a>}
          >
            <a href="/admin">
              Order Dashboard
            </a>
            <Divider />
            <a href="/centremaint">
              Centre Admin
            </a>
          </Dropdown>,
        ]
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
        brand={<a href={"/"}>Explore Rewards</a>}
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
