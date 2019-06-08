export function addVariantToStudentCart(variantId, quantity) {
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
  console.log("in addVariantToStudentCart(): props: ", this.props);
  console.log("in addVariantToStudentCart(): state: ", this.state);

  this.handleStudentCartOpen();
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
