import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";
import { addLine } from "../../actions/cartActions";
import { submitLineItems } from "../../actions/orderActions";
import { updateFavourite } from "../../actions";
import { fetchUser } from "../../actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCabinet,
  invalidateCabinet,
  filterCabinet
} from "../../actions/rewardActions";
import { ProgressBar } from "react-materialize";
import CabinetFilters from "../rewards/CabinetFilters";

class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    this.handleFavourites = this.handleFavourites.bind(this);
    this.handleFavSwitchChanged = this.handleFavSwitchChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
      this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user && this.props.user !== prevProps.user) {
      const { dispatch, user } = this.props;
      dispatch(fetchCabinet(user._learningCentreId));
    }
  }

  async handleAddToCartClick(
    rewardId,
    productTitle,
    variantId,
    quantity,
    glrpoints,
    img
  ) {
    await this.props.dispatch(
      addLine(
        this.props.user,
        rewardId,
        productTitle,
        variantId,
        quantity,
        glrpoints,
        img
      )
    );
    let finalReqBody = {
      lineItems: this.props.cart.cart,
      user: this.props.user
    };
    //console.log("req body",finalReqBody);
    this.props.dispatch(submitLineItems(finalReqBody, this.props.history));
  }

  handleFavourites(add, rewardId) {
    //console.log("rewardId: ", rewardId);
    //console.log("userId: ", this.props.user._id);
    //console.log(add);
    let favourite = this.props.user.favourites.find(item => {
      return item._rewardId === rewardId;
    });
    //console.log(favourite);
    //if this is an add then we pass the rewardId to create a new fav
    //if this is not an add then we are deleting and we pass actual favourite Id to the action
    const commandId = add ? rewardId : favourite._id;
    this.props.dispatch(updateFavourite(this.props.user._id, commandId, add));
  }

  handleFavSwitchChanged(event) {
    const { dispatch } = this.props;
    //console.log(event.target.checked);
    dispatch(filterCabinet(event.target.checked));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const { dispatch, user } = this.props;
    dispatch(invalidateCabinet(user._learningCentreId));
    dispatch(fetchCabinet(user._learningCentreId));
  }
  render() {
    const { user, cabDetail, isFetching, lastUpdated } = this.props;
    if (!user) return <ProgressBar />;
    return (
      <div>
        <div>
          {isFetching && JSON.stringify(cabDetail) === JSON.stringify({}) && (
            <ProgressBar />
          )}
          {!isFetching && JSON.stringify(cabDetail) === JSON.stringify({}) && (
            <h2>No Cabinet</h2>
          )}
          {JSON.stringify(cabDetail) !== JSON.stringify({}) && (
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <CabinetFilters
                favourites={this.props.filterSwitch}
                onFavSwitchChanged={this.handleFavSwitchChanged}
              />
              <ShelfList
                isFetching={this.props.isFetching}
                favOnly={this.props.filterSwitch}
                isAdmin={this.props.user.roles.includes("admin")}
                isMember={this.props.user.roles.includes("member")}
                favourites={this.props.user.favourites}
                shelves={cabDetail.shelves}
                onAddToCartClickShelf={this.handleAddToCartClick}
                onClickFavourites={this.handleFavourites}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

CabinetContainer.propTypes = {
  user: PropTypes.object.isRequired,
  centre: PropTypes.string.isRequired,
  cabDetail: PropTypes.object,
  filterSwitch: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  cart: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { cabinet } = state;
  const { filterSwitch, isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  let user = state.auth;
  let cart = state.cart;
  //console.log(state.cart);
  return {
    user,
    filterSwitch,
    cabDetail,
    cart,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(CabinetContainer);
