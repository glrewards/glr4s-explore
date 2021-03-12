import React, { Component } from 'react';
import {searchOrders} from "../../actions/UIActions";
import {fetchOrdersByParams} from "../../actions/orderActions";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
class AdminSearch extends Component {
    // Called when user starts typing into the Search Bar
    onChange = e => {
        console.log(e.target.value);
        this.props.searchOrders(e.target.value)
    }

    // Clicking Search button fires off fetchStories based
    // on the provided text.
    onSubmit = e => {
        e.preventDefault();
        this.props.fetchOrdersByParams(this.props.text);
    }

    render() {
        return (
            <div>
                <h1>I am but a measly Search Component</h1>
            </div>
        );
    }
}
AdminSearch.propTypes = {
    fetchOrders: PropTypes.func.isRequired,
    searchOrders: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    text: state.ui.searchParams
});
export default connect(mapStateToProps, {searchOrders, fetchOrdersByParams}) (AdminSearch);
