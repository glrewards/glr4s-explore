import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, Button, Icon, Row, Col } from "react-materialize";

class RewardCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="align-center center-align">{this.props.title}</h1>
        <Card header={<CardTitle image={this.props.imageURL} height={"300"}/>} />
        <Row>
            <div dangerouslySetInnerHTML={{
            __html: this.props.bodyhtml
        }} >
            </div>
        </Row>
        <Row>
          <Col s={6}>
            <Button
              s={6}
              style={{ width: "100%" }}
              className={
                this.props.favourite ? "blue darken-3" : "yellow darken-2"
              }
              waves={"purple"}
            >
              A Favourite<Icon right>favorite</Icon>
            </Button>
          </Col>
          <Col s={6}>
            <Button
              s={6}
              style={{ width: "100%" }}
              className={
                this.props.favourite ? "blue darken-3" : "yellow darken-2"
              }
              waves={"purple"}
            >
              Add To Cart<Icon right>add_shopping_cart</Icon>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

RewardCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  bodyhtml: PropTypes.string,
  reward: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isMember: PropTypes.bool.isRequired,
  favourite: PropTypes.bool.isRequired,
  onAddToCartClick: PropTypes.func.isRequired,
  onClickFavourites: PropTypes.func.isRequired
};

export default RewardCard;
