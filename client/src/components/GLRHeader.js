import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from '../images/logo.png';
import M from 'materialize-css';
import GLRSubHeader  from './GLRSubHeader';

class GLRHeader extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    renderContentTop(side) {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                //console.log(this.props);
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

    renderContentSub(){
        switch (this.props.auth) {
            case null:
                return;
            case false:
                //console.log(this.props);
                return;
            default:
                return (<GLRSubHeader />);
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

                    {this.renderContentSub()}

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
