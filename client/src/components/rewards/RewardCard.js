import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, Button, Icon, Row, Col,MediaBox } from "react-materialize";

class RewardCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const cardImageStyle = {
      maxWidth: "70%",
      height: "auto",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    };
      if (!this.props.reward) {
          console.log(this.props);
          return <div>No data</div>;
      }
    return (

      <div>

        <Card>
            <h1 className="align-center center-align">{this.props.title}</h1>
            <MediaBox>
          <img src={this.props.imageURL} style={cardImageStyle} />
            </MediaBox>
          <Row>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.bodyhtml
              }}
            />
          </Row>
        </Card>
        <Row>
          <Col s={6}>
            <Button
              s={6}
              style={{ width: "100%" }}
              disabled={!this.props.isMember}
              className={
                this.props.favourite ? "blue darken-3" : "yellow darken-2"
              }
              waves={"purple"}
              onClick={() => {
                this.props.onClickFavourites(!this.props.favourite, this.props.reward._id);
              }}
            >
              A Favourite<Icon right>favorite</Icon>
            </Button>
          </Col>
          <Col s={6}>
            <Button
              s={6}
              style={{ width: "100%" }}
              disabled={!this.props.isMember}
              className={"yellow darken-2"}
              waves={"purple"}
              onClick={() => {
                this.props.onAddToCartClick(this.props.reward._id,
                    this.props.reward._shopifyProduct.title,
                    this.props.reward._shopifyProduct.variants[0].id, //TODO: just taking the first variant for now
                    1, //setting to 1 as there is no other option for the user
                    this.props.reward._shopifyProduct.points,
                    this.props.reward._shopifyProduct.image.src);
              }}
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
