import React, { Component } from "react";
import ProductGrid from "./ProductGrid";
import PropTypes from "prop-types";
import {
  addVariantToStudentCart,
  removeLineItemInStudentCart,
  updateLineItemInStudentCart,
  createStudentCheckout
} from "./GLRcheckout";
import Cart from "./tutorial/Cart";
import { connect } from "react-redux";

class GLRShop extends Component {
  constructor() {
    super();

    this.state = {
      isStudentCartOpen: false,
      products: [],
      studentCheckout: { lineItems: { edges: [] } }
    };

    this.handleStudentCartClose = this.handleStudentCartClose.bind(this);
    this.handleStudentCartOpen = this.handleStudentCartOpen.bind(this);
    this.addVariantToStudentCart = addVariantToStudentCart.bind(this);
    this.updateLineItemInStudentCart = updateLineItemInStudentCart.bind(this);
    this.removeLineItemInStudentCart = removeLineItemInStudentCart.bind(this);
    this.createStudentCheckout = createStudentCheckout.bind(this); //looks for an open school order or creates one
  }

  handleStudentCartOpen() {
    this.setState({
      isStudentCartOpen: true
    });
  }

  handleStudentCartClose() {
    this.setState({
      isStudentCartOpen: false
    });
  }

  componentWillMount() {
    //TODO: as the component loads we now need to create a checkout
    this.setState({
      studentCheckout: { summary: "JT just creates this with a set state" }
    });
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object
    }).isRequired,
    createStudentCheckout: PropTypes.func.isRequired,
    studentCheckoutLineItemsAdd: PropTypes.func.isRequired,
    studentCheckoutLineItemsUpdate: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="App">
        <header className="App__header">
          {!this.state.isStudentCartOpen && (
            <div>
              <button
                className="App__view-cart"
                onClick={() => this.setState({ isStudentCartOpen: true })}
              >
                My GLR4Schools Cart
              </button>
            </div>
          )}
          <div className="App__title">
            <h1>GLR 4 Schools</h1>
          </div>
        </header>
        <div>
          <ProductGrid />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth: auth };
}
export default connect(mapStateToProps)(GLRShop);
