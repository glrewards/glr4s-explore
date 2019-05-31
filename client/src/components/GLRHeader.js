import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";
import GLRSubHeader from "./GLRSubHeader";

class GLRHeader extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems);
    M.AutoInit();
  }

  renderGLRPoints(){
    if(this.props.auth._student){
      return "GLRPoints: " + this.props.auth._student.currentPoints;

    }else{
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
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key={side + "1"} style={{ margin: "0 10px" }}>
            {this.renderGLRPoints()}
          </li>,
          <li key={side + "2"}>
            <a href="/api/logout">Logout</a>
          </li>
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
            <div className="nav-wrapper blue-grey">
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

function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps)(GLRHeader);
