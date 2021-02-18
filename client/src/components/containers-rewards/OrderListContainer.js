import React, { Component } from "react";
import OrderList from "../rewards/OrderList";
import {connect} from "react-redux";


class OrderListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleLineClicked = this.handleLineClicked.bind(this);
    }
    render(){
        return (<OrderList lineItems={[]} onLineClicked={this.handleLineClicked} />)
    }
    handleLineClicked(event){

    }
}

function mapStateToProps(state) {


}
export default connect(mapStateToProps)(OrderListContainer);
