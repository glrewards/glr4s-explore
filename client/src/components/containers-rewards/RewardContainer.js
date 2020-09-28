import React, { Component } from "react";
import RewardCard from "../rewards/RewardCard";
import { Row, Col, CardTitle } from "react-materialize";
import { connect } from "react-redux";
import { addLine } from "../../actions/cartActions";
import { updateFavourite } from "../../actions";
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

  handleAddToCart(rewardId, productTitle, variantId, quantity, glrpoints, img) {
    this.props.dispatch(
      addLine(
        this.props.user._student,
        rewardId,
        productTitle,
        variantId,
        quantity,
        glrpoints,
        img
      )
    );
  }

  handleFavourite(add, rewardId) {
    console.log("rewardId: ", rewardId);
    console.log("userId: ", this.props.user._id);
    console.log(add);
    let favourite = this.props.user.favourites.find(item => {
      return item._rewardId === rewardId;
    });
    //console.log(favourite);
    //if this is an add then we pass the rewardId to create a new fav
    //if this is not an add then we are deleting and we pass actual favourite Id to the action
    const commandId = add ? rewardId : favourite._id;
    this.props.dispatch(updateFavourite(this.props.user._id, commandId, add));
  }

  render() {
    return (
      <Row>
        <Col s={12} m={12}>
          <RewardCard
            title={this.props.reward._shopifyProduct.title}
            imageURL={this.props.reward._shopifyProduct.image.src}
            bodyhtml={this.props.reward._shopifyProduct.body_html}
            favourite={this.props.favourite}
            reward={this.props.reward}
            isMember={this.props.user.roles.includes("member")}
            isAdmin={this.props.user.roles.includes("admin")}
            onAddToCartClick={this.handleAddToCart}
            onClickFavourites={this.handleFavourite}
          />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { cabinet } = state;
  const { cabDetail } = cabinet;
  let user = state.auth;
  let rewards = [];

  //First We need to find the actual reward and map it into props
  //then we need to see if it is a favourite and set the flag

  cabDetail.shelves.forEach(shelf => {
    shelf.rewardItems.forEach(item => {
      rewards.push(item);
    });
  });

  // now we just need to find the item with the rewardId
  let foundItem = rewards.find(reward => {
    //console.log("provided id: " + rewardId, reward._id);
    if (
      JSON.stringify(reward._id) === JSON.stringify(ownProps.match.params.id)
    ) {
      return true;
    } else {
      return false;
    }
  });
  const reward = foundItem;

  //part 2 check the favourites.
  let favourite = user.favourites.find(item => {
    return item._rewardId === reward._id;
  });

  return {
    user,
    reward,
    favourite
  };
}
export default connect(mapStateToProps)(RewardContainer);
