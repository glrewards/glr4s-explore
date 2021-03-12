import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ProgressBar, Row} from "react-materialize";
import SuperAdminDashboard from "../admin/SuperAdminDashboard";
import {searchOrders} from "../../actions/UIActions";
import {fetchOrdersByParams} from "../../actions/orderActions";

class SuperAdminDashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.handleOrderLineClicked = this.handleOrderLineClicked.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }
    handleOrderLineClicked(event){
       //doing nothing
    }
    handleSearchSubmit(event){
        console.log("handleSearchSubmit");
        console.log(this.props.searchParams);
        this.props.dispatch(fetchOrdersByParams(this.props.searchParams));
    }
    handleSearch(event){
        this.props.dispatch(searchOrders(event.target.id, event.target.value));

    }
    render(){
        return(
            <SuperAdminDashboard onOrderLineClicked={this.handleOrderLineClicked} onSearch={this.handleSearch} onSubmitSearch={this.handleSearchSubmit}/>
        )
    }
}
function mapStateToProps(state) {
    console.log(state.ui);
 return {
     //we care about the orderSearchParams

     searchParams: state.ui.orderSearchParams
 }
}

export default connect(mapStateToProps)(SuperAdminDashboardContainer);
