
//REMEMBER THIS IS MOST LIKE THE DASHBOARD FROM THE TUTORIAL
import './shop.css';
import React, { Component } from 'react';
import Product from './tutorial/Product';
import Cart from './tutorial/Cart';
import CustomerAuthWithMutation from './tutorial/CustomerAuth';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {
    createCheckout,
    checkoutLineItemsAdd,
    checkoutLineItemsUpdate,
    checkoutLineItemsRemove,
    checkoutCustomerAssociate,
    addVariantToCart,
    updateLineItemInCart,
    removeLineItemInCart,
    associateCustomerCheckout
} from './tutorial/checkout';
import {connect} from "react-redux";

class GLRShop extends Component {
    constructor() {
        super();

        this.state = {
            isCartOpen: false,
            isCustomerAuthOpen: false,
            isNewCustomer: false,
            products: [],
            checkout: { lineItems: { edges: [] } }
        };

        this.handleCartClose = this.handleCartClose.bind(this);
        this.handleCartOpen = this.handleCartOpen.bind(this);
        this.openCustomerAuth = this.openCustomerAuth.bind(this);
        this.closeCustomerAuth = this.closeCustomerAuth.bind(this);
        this.addVariantToCart = addVariantToCart.bind(this);
        this.updateLineItemInCart = updateLineItemInCart.bind(this);
        this.removeLineItemInCart = removeLineItemInCart.bind(this);
        this.showAccountVerificationMessage = this.showAccountVerificationMessage.bind(this);
        this.associateCustomerCheckout = associateCustomerCheckout.bind(this);
    }

    componentWillMount() {
        this.props.createCheckout({
            variables: {
                input: {}
            }}).then((res) => {
            this.setState({
                checkout: res.data.checkoutCreate.checkout
            });
        });
    }

    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            shop: PropTypes.object,
        }).isRequired,
        createCheckout: PropTypes.func.isRequired,
        checkoutLineItemsAdd: PropTypes.func.isRequired,
        checkoutLineItemsUpdate: PropTypes.func.isRequired
    }

    handleCartOpen() {
        this.setState({
            isCartOpen: true,
        });
    }

    handleCartClose() {
        this.setState({
            isCartOpen: false,
        });
    }

    openCustomerAuth(event) {
        if (event.target.getAttribute('data-customer-type') === "new-customer") {
            this.setState({
                isNewCustomer: true,
                isCustomerAuthOpen: true
            });
        } else {
            this.setState({
                isNewCustomer: false,
                isCustomerAuthOpen: true
            });
        }
    }

    showAccountVerificationMessage(){
        this.setState({ accountVerificationMessage: true });
        setTimeout(() => {
            this.setState({
                accountVerificationMessage: false
            })
        }, 5000);
    }

    closeCustomerAuth() {
        this.setState({
            isCustomerAuthOpen: false,
        });
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading ...</p>;
        }
        if (this.props.data.error) {
            return <p>{this.props.data.error.message}</p>;
        }

        return (
            <div className="App">
                <header className="App__header">
                    {!this.state.isCartOpen &&
                    <div className="App__view-cart-wrapper">
                        <button className="App__view-cart" onClick={()=> this.setState({isCartOpen: true})}>My GLR4Schools Cart</button>
                    </div>
                    }
                    <div className="App__title">
                        <h1>{this.props.data.shop.name}: Sample Store</h1>
                    </div>
                </header>
                <div className="Product-wrapper">
                    { this.props.data.shop.products.edges.map(product =>
                        <Product user={this.props.auth} addVariantToCart={this.addVariantToCart} checkout={this.state.checkout} key={product.node.id.toString()} product={product.node} />
                    )}
                </div>
                <Cart
                    removeLineItemInCart={this.removeLineItemInCart}
                    updateLineItemInCart={this.updateLineItemInCart}
                    checkout={this.state.checkout}
                    isCartOpen={this.state.isCartOpen}
                    handleCartClose={this.handleCartClose}
                    customerAccessToken={this.state.customerAccessToken}
                />
            </div>
        );
    }
}

const query = gql`
  query {
    shop {
      name
      description
      products(query:"inventory_total:>0", first:10) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            options {
              id
              name
              values
            }
            metafield(key: "glrpoints", namespace: "GLR") {
             metakey: key
             metavalue: value
            }
            variants(first: 5) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 2) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

const AppWithDataAndMutation = compose(
    graphql(query),
    graphql(createCheckout, {name: "createCheckout"}),
    graphql(checkoutLineItemsAdd, {name: "checkoutLineItemsAdd"}),
    graphql(checkoutLineItemsUpdate, {name: "checkoutLineItemsUpdate"}),
    graphql(checkoutLineItemsRemove, {name: "checkoutLineItemsRemove"}),
    graphql(checkoutCustomerAssociate, {name: "checkoutCustomerAssociate"})
)(GLRShop);


function mapStateToProps({ auth }) {
    return { auth: auth };
}
export default connect(mapStateToProps)(AppWithDataAndMutation);
//export default AppWithDataAndMutation;