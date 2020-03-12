import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actions from '../actions';

class ThemeExample extends Component{

    render(){

        return (
            <div className="row">

                <div className="col s12 m4 l3">

                </div>

                <div className="col s12 m8 l9">

                </div>

            </div>

        );
    }
}

export default connect(null,actions) (ThemeExample);

