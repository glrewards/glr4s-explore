import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from "redux";

import {fetchLineItems, fetchUser, submitLineItems} from "../../actions";
import {deleteAllLines} from "../../actions/cartActions";

class AdminDashOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.saveLines = this.saveLines.bind(this);
    }

    componentDidMount() {
        /*
        when the component loads try check to see if the user is logged in and is an admin
        if they are not then do a fetch user which may or may not work
        TODO: need to sort out this user logic not clear!
        Next we fetch the lineitems for the order
        */
        console.log("componentDidMount: : ", this.props);
        if (!this.props.auth) {
            console.log("componentDidMount: NO AUTH - fetching user");
            this.props.fetchUser.fetchUser();
            console.log("ComponentDidMount: fetched user: is async remember so still nothing in props",this.props);

        }
        //console.log("not having to fetch user",this.props);
        //this.props.fetchLineItems.fetchLineItems(this.props.auth._student);
        //console.log(this.state.lineItems);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
         if (this.props.auth !== prevProps.auth) {
            this.props.fetchLineItems.fetchLineItems(this.props.auth._student);
        }
    }

    saveLines(cart){
        //each line has everything we need apart from the student Id so we need to use forEach to add the student id
        //then we need to trigger the action
        //need to add in the auth

        let finalReqBody = {
            lineItems: cart,
            user: this.props.auth};

        this.props.submitLineItemsOnClick(finalReqBody,this.props.history);

    }
    renderListItems() {
        return this.props.cart.map((line, index) => {
            return (
                <div className="row" key={index}>
                    <div className="col s12">
                        <ul className="collection">
                            <li key={line.variantId} className="collection-item avatar">
                                <img className="circle" src={line.img} alt="temp"/>
                                <span className="card-title">{line.productTitle}</span>
                                <div>
                                    <ul>
                                        <li className="right-aligned">
                                            GLRPoints: {line.glrpoints}
                                        </li>
                                        <li className="right-align">Quantity: {line.quantity}</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });
    }

    render() {
        return <div className="container">
            {this.renderListItems()}
            <button
                className="btn yellow darken-3 waves-effect waves-light right-aligned"
                onClick={() => {
                    this.saveLines(this.props.cart);
                }
                }
            >
                Save Order
            </button>
            <button
                className="btn red darken-3 waves-effect waves-light right-aligned"
                onClick={() => {
                    this.props.clearCartOnClick();
                }
                }
            >
                Clear Cart
            </button>
        </div>;
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps: state: ", state);
    return {
        auth: state.auth,
        cart: state.cart.cart,
        lineItems: state.lineItems
    };
}



const mapDispatchToProps = dispatch => {
    return {
        submitLineItemsOnClick: (lines,his) => {
            dispatch(submitLineItems(lines,his))
        },
        clearCartOnClick: (cart) =>{
            dispatch(deleteAllLines())
        },
        fetchLineItems: bindActionCreators({ fetchLineItems }, dispatch),
        fetchUser: bindActionCreators({ fetchUser }, dispatch)
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashOrderDetails);
