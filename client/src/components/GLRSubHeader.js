import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../actions';
import {Link} from "react-router-dom";

class GLRSubHeader extends Component{

    renderContent(){

    }

    render(){
        console.log(this.props.auth);
        return (
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab"><a href="#test1">Homework</a></li>
                    <li className="tab"><Link

                        to={this.props.auth ? "/shop" : "/"}>
                        Shop
                    </Link></li>
                    <li className="tab disabled"><a href="#test3">Admin</a></li>
                    <li className="tab"><a href="">School Shop</a></li>
                </ul>
            </div>

        );
    }
}

function mapStateToProps({ auth }) {
    return { auth: auth };
}

export default connect(mapStateToProps)(GLRSubHeader);