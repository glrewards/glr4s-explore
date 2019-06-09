export function addVariantToStudentCart(student, product, variantId, quantity) {
  //TODO: replace this gql mutation with a simple add to state line - remember not to mutate the original state
  /*
  this.props.studentCheckoutLineItemsAdd(
    { lineItems:  [{variantId, quantity: parseInt(quantity, 10)}]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsAdd.studentCheckout
    });
  });

   */
    console.log("lineItem: ", variantId);
    console.log("quantity: ", quantity);

  console.log("in addVariantToStudentCart(): props: ", this.props);
  console.log("in addVariantToStudentCart(): state: ", this.state);

/*
    {
        "lineItems":[{
        "productId":"gid://shopify/Product/2066200985667",
        "productTitle":"Bananas for Books Bookmarks - 36 Bookmarks - DR",
        "quantity": 200,
        "variantId": "gid://shopify/ProductVariant/18919054671939",
        "glrpoints": 2000,
        "_student": "5cf67d590e67a54e8fbefe7c"
    }],
        "user":{
        "credits":1000,
            "_student":{
            "_id":"5cf67d590e67a54e8fbefe7c",
                "currentPoints":900,
                "_school":"5ce3c2d80e67a54e8fbefe74"
        }
    }
    }

 */
    this.setState(function (state,props) {
        console.log("set state props: ",props);
        console.log("set state state: ",state);
    return {
        studentCheckout: this.state.studentCheckout.lineItems.push({variantId: variantId,quantity: quantity})
    };
    });

    //this.handleStudentCartOpen();

}

export function updateLineItemInStudentCart(lineItemId, quantity) {
  //TODO: replace this gql mutation with a simple add to state line - remember not to mutate the original state
  /*
  this.props.studentCheckoutLineItemsUpdate(
    {studentCheckoutId: this.state.studentCheckout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsUpdate.studentCheckout
    });
  });

   */
  console.log("lineItem: ", lineItemId);
    console.log("quantity: ", quantity);
  console.log("in updateLineItemInStudentCart(): props: ", this.props);
  console.log("in updateLineItemInStudentCart(): state: ", this.state);
}

export function removeLineItemInStudentCart(lineItemId) {
  //TODO: replace this gql mutation with a simple add to state line - remember not to mutate the original state
  /*
  this.props.studentCheckoutLineItemsRemove(
    { lineItemIds: [lineItemId]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsRemove.studentCheckout
    });
  });

   */
  console.log("in removeLineItemInStudentCart(): props: ", this.props);
  console.log("in removeLineItemInStudentCart(): state: ", this.state);
}
export function createStudentCheckout(studentId) {
  //TODO:create a local list of items that will be added if directed at the end by the student
  console.log("in createStudentCheckout(): props: ", this.props);
  console.log("in createStudentCheckout(): state: ", this.state);
}
