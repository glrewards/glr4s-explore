import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from '../images/logo.png';
import M from 'materialize-css';

class GLRHeader extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    renderContentTop(side) {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                console.log(this.props);
                return (
                    <li key = {side+"0"}>
                        <a href="/auth/google">Login with Google</a>
                    </li>
                );
            default:
                return [
                    <li key={side+"1"} style={{ margin: "0 10px" }}>
                        {" "}
                        GLRPoints: {this.props.auth.credits}
                    </li>,
                    <li key={side+"2"}>
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <div>
                <nav className="nav-extended">
                    <div className="nav-wrapper blue-grey">
                        <Link
                            to={this.props.auth ? "/surveys" : "/"}
                            className="left">
                            GLR4S - DEV
                        </Link>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i
                            className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.renderContentTop("t")}
                        </ul>

                    </div>
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><a href="#test1">Homework</a></li>
                            <li className="tab"><a className="active" href="#test2">Shop</a></li>
                            <li className="tab disabled"><a href="#test3">Admin</a></li>
                            <li className="tab"><a href="#test4">School Shop</a></li>
                        </ul>
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
