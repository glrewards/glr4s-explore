import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";
import {addLine} from "../../actions/cartActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCabinet, invalidateCabinet } from "../../actions/rewardActions";
import {ProgressBar} from "react-materialize";


class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  componentDidMount() {
    if(this.props.user){
      this.props.dispatch(invalidateCabinet(this.props.user._learningCentreId));
      this.props.dispatch(fetchCabinet(this.props.user._learningCentreId));
    }
  }

 componentDidUpdate(prevProps, prevState, snapshot) {
    if((this.props.user) && (this.props.user !== prevProps.user)){
      const { dispatch, user } = this.props;
      dispatch(fetchCabinet(user._learningCentreId))
    }
  }

  handleAddToCartClick(rewardId, productTitle, variantId, quantity,glrpoints, img){
    this.props.dispatch(addLine(this.props.user._student,rewardId, productTitle, variantId, quantity,glrpoints, img))
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, user } = this.props;
    dispatch(invalidateCabinet(user._learningCentreId));
    dispatch(fetchCabinet(user._learningCentreId));
  }
  render() {
    const { user, cabDetail, isFetching, lastUpdated } = this.props;
    if(!user) return(<ProgressBar/>);
    return (
      <div>
        <div>
          {isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <ProgressBar/> }
            {!isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>No Cabinet</h2> }
            {(JSON.stringify(cabDetail) !== JSON.stringify({})) &&(
                <div style={{opacity: isFetching ? 0.5:1}}>
            <ShelfList
                isAdmin={this.props.user.isAdmin}
                shelves={cabDetail.shelves}
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
  const { cabinet } = state;
  const { isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  let user = state.auth;
  return {
    user,
    cabDetail,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(CabinetContainer);
