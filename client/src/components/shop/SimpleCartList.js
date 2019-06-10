import React, { Component } from "react";
import { connect } from "react-redux";
import { submitLineItems } from "../../actions";
import {deleteAllLines} from "../../actions/cartActions";
import {withRouter} from 'react-router-dom';


class SimpleCartList extends Component {
  constructor(props) {
    super(props);
    this.saveLines = this.saveLines.bind(this);
  }
  saveLines(cart){
        //each line has everything we need apart from the student Id so we need to use forEach to add the student id
        //then we need to trigger the action
      //need to add in the auth

      let finalReqBody = {
          lineItems: cart,
          user: this.props.auth}

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
  return {
    auth: state.auth,
    cart: state.cart.cart
  };
}



const mapDispatchToProps = dispatch => {
    return {
        submitLineItemsOnClick: (lines,his) => {
            dispatch(submitLineItems(lines,his))
        },
        clearCartOnClick: (cart) =>{
            dispatch(deleteAllLines())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SimpleCartList));
