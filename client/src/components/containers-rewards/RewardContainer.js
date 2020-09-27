import React, { Component } from "react";
import RewardCard from "../rewards/RewardCard";
import { Row, Col, CardTitle } from "react-materialize";

class RewardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  componentDidMount() {
    console.log("temp");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("temp");
  }

  handleAddToCart(){
      console.log("add to cart");
  }
  handleFavourite(){
      console.log("handle favourite")
  }
  render() {
    return (
      <Row>
        <Col s={12} m={12}>
          <RewardCard
            title={"test card"}
            imageURL={"https://cdn.shopify.com/s/files/1/0039/1633/3123/products/RGAS.jpg?v=1551870319"}
            bodyhtml={"<h2>These pens are so cool! - with two designs to collect, WOW and Watermelon.</h2>"}
            favourite={false}
            reward={null}
            isMember={true}
            isAdmin={false}
            onAddToCartClick={this.handleAddToCart}
            onClickFavourites={this.handleFavourite}
          >
          </RewardCard>
        </Col>
      </Row>
    );
  }
}
export default RewardContainer;
