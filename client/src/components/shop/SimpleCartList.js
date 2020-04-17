import React, { Component } from "react";
import { connect } from "react-redux";
import { submitLineItems } from "../../actions";
import { deleteAllLines,amendLine,fetchCartItems } from "../../actions/cartActions";
import { Collection, CollectionItem, TextInput } from "react-materialize";
import { withRouter } from "react-router-dom";


class SimpleCartList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.state);
    this.saveLines = this.saveLines.bind(this);
    this.handleAmends = this.handleAmends.bind(this);
  }


  handleAmends(index,quantity){
   console.log("handleAmends: ",index, quantity);
   this.props.amendQuantityOnEdit(index,quantity);

  }
  saveLines(cart) {
    //each line has everything we need apart from the student Id so we need to use forEach to add the student id
    //then we need to trigger the action
    //need to add in the auth

    let finalReqBody = {
      lineItems: cart,
      user: this.props.auth
    };

    this.props.submitLineItemsOnClick(finalReqBody,this.props.history);
  }
  renderListItems() {
    console.log("renderListItems: ", this.props);
    return this.props.cart.map((line, index) => {
      return (
        <div className="row" key={index}>
          <div className="col s12">
            <Collection>
              <CollectionItem key={line.variantId} className="avatar">
                <img
                  className="circle"
                  src={line.img}
                  alt={line.propductTitle}
                />
                <span className="card-title">{line.productTitle}</span>
                  <div>
                    <p>
                      Lizard Cards Needed: {line.glrpoints}
                    </p>
                    <div className="offset-5 col-3">
                      <TextInput
                          label={"Quantity"}
                      className="right-align active right-aligned"
                      defaultValue={line.quantity}
                      type="number"
                      disabled={false}
                      onChange={(e) => {this.handleAmends(index,e.target.value)}}
                      />
                    </div>
                  </div>
              </CollectionItem>
            </Collection>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log("in render(): ", this.props);
    return (
      <div className="container">
        {this.renderListItems()}
        <button
          className="btn yellow darken-3 waves-effect waves-light right-aligned"
          onClick={() => {
            this.saveLines(this.props.cart);
          }}
        >
          Save Order
        </button>
        <button
          className="btn red darken-3 waves-effect waves-light right-aligned"
          onClick={() => {
            this.props.clearCartOnClick();
            this.props.history.goBack();
          }}
        >
          Clear Cart
        </button>
      </div>
    );
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
    submitLineItemsOnClick: (lines, his) => {
      dispatch(submitLineItems(lines, his));
    },
    clearCartOnClick: cart => {
      console.log("clear got triggered");
      dispatch(deleteAllLines());
    },
    amendQuantityOnEdit: (index,quantity) => {
      dispatch(amendLine(index,quantity))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleCartList);
