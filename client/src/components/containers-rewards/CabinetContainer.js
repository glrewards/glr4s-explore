import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCabinet, invalidateCabinet } from "../../actions/rewardActions";
import {Button} from "react-materialize";

class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    console.log("CabinetContainer: props", props);
    console.log("CabinetContainer: props", this.state);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
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

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, user } = this.props;
    console.log("handleRefresh: ", this.props);
    dispatch(invalidateCabinet(user._learningCentreId));
    dispatch(fetchCabinet(user._learningCentreId));
  }
  render() {
    const { user, cabDetail, isFetching, lastUpdated } = this.props;
    if(!user) return(<div></div>);
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
            {isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>Loading...</h2> }
            {!isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>No Cabinet</h2> }
            {(JSON.stringify(cabDetail) !== JSON.stringify({})) &&(
                <div style={{opacity: isFetching ? 0.5:1}}>
            <ShelfList shelves={cabDetail.shelves}/>
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
  console.log("this is the state in map state to props: ", state);
  const { cabinet } = state;
  const { isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  let user = state.auth;
  console.log("this is the USER in map state to props: ", user);
  return {
    user,
    cabDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(CabinetContainer);
