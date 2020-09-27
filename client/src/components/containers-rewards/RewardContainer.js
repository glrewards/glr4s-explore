import React, { Component } from "react";
import RewardCard from "../rewards/RewardCard";
import { Row, Col, CardTitle } from "react-materialize";
import {connect} from "react-redux";
//import {useParams} from "react-router";

class RewardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }
  componentDidMount() {
    console.log(this.props.reward);
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
            title={this.props.reward._shopifyProduct.title}
            imageURL={this.props.reward._shopifyProduct.image.src}
            bodyhtml={this.props.reward._shopifyProduct.body_html}
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


function mapStateToProps(state,ownProps) {
  const { cabinet } = state;
  const { cabDetail } = cabinet;
  let user = state.auth;
  let rewards = [];

  cabDetail.shelves.forEach((shelf) => {
    shelf.rewardItems.forEach((item) => {
      rewards.push(item);
    });
  });
  //logger.debug(rewards);

  // now we just need to find the item with the rewardId
  let foundItem = rewards.find((reward) => {
    //console.log("provided id: " + rewardId, reward._id);
    if (JSON.stringify(reward._id) === JSON.stringify(ownProps.match.params.id)) {

      return true;
    } else {
      return false;
    }
  });
  const reward = foundItem;
  //console.log(foundItems);
  return {
    user,
    reward
  };
}
export default connect(mapStateToProps)(RewardContainer);
