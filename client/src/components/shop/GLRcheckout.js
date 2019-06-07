

export function addVariantToStudentCart(variantId, quantity){
  this.props.studentCheckoutLineItemsAdd(
    { lineItems:  [{variantId, quantity: parseInt(quantity, 10)}]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsAdd.studentCheckout
    });
  });

  this.handleStudentCartOpen();
}

export function updateLineItemInStudentCart(lineItemId, quantity){
  this.props.studentCheckoutLineItemsUpdate(
    {studentCheckoutId: this.state.studentCheckout.id, lineItems: [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsUpdate.studentCheckout
    });
  });
}

export function removeLineItemInStudentCart(lineItemId){
  //TODO: replace this gql mutation with a simple add to state line
  this.props.studentCheckoutLineItemsRemove(
    { lineItemIds: [lineItemId]
    }).then((res) => {
    this.setState({
      studentCheckout: res.data.studentCheckoutLineItemsRemove.studentCheckout
    });
  });
}
export function createStudentCheckout(studentId){

}


