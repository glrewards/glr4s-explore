import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";
import {addLine} from "../../actions/cartActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCabinet, invalidateCabinet } from "../../actions/rewardActions";
import {Button, Toast} from "react-materialize";

class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    console.log("CabinetContainer: props", props);
    console.log("CabinetContainer: props", this.state);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  componentDidMount() {
    console.log("component did mount: ", this.props);
    if(this.props.user){
      this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
      this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
    }
  }

 componentDidUpdate(prevProps, prevState, snapshot) {
      console.log("previousProps: ", prevProps);
    console.log("previousState: ", prevState);
    console.log("CurrentProps: ", this.props);
    if((this.props.user) && (this.props.user != prevProps.user)){
      const { dispatch, user } = this.props;
      dispatch(fetchCabinet(user._learningCentreId))
    }
  }

  handleAddToCartClick(rewardId, productTitle, variantId, quantity,glrpoints, img){
    console.log("In handleAddToCartClick: ",rewardId,img);
    this.props.dispatch(addLine(this.props.user._student,rewardId, productTitle, variantId, quantity,glrpoints, img))
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, user } = this.props;
    console.log("handleRefresh: ", this.props);
    dispatch(invalidateCabinet(user._learningCentreId));
    dispatch(fetchCabinet(user._learningCentreId));
  }
  render() {
    const { user, cabDetail, isFetching, lastUpdated } = this.props;
    console.log("in render: ", this.props);
    if(!user) return(<div>Fetching</div>);
    return (
      <div>
        <p>
          {lastUpdated && (
            <span>
              last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <Button className="col s12 amber darken-4" onClick={this.handleRefreshClick} >Refresh</Button>
          )}
        </p>
        <div>
          {isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>Loading</h2> }
            {!isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>No Cabinet</h2> }
            {(JSON.stringify(cabDetail) !== JSON.stringify({})) &&(
                <div style={{opacity: isFetching ? 0.5:1}}>
            <ShelfList shelves={cabDetail.shelves}
                       onAddToCartClickShelf={this.handleAddToCartClick}/>
                </div>
            )}
        </div>
      </div>
    );
  }
}

CabinetContainer.propTypes = {
  centre: PropTypes.string.isRequired,
  cabDetail: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  //console.log("this is the state in map state to props: ", state);
  const { cabinet } = state;
  const { isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  let user = state.auth;
  //console.log("this is the USER in map state to props: ", user);
  return {
    user,
    cabDetail,
    isFetching,
    lastUpdated
  };
}

/*
const mapDispatchToProps = dispatch => {
  return {
    onAddToCartClick: (rewardId, productTitle, variantId, quantity,glrpoints, img) => {
      dispatch(addLine(this.props.user._student,rewardId, productTitle, variantId, quantity,glrpoints, img))
    }

  }
}
*/


export default connect(mapStateToProps)(CabinetContainer);
