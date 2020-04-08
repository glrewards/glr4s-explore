import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCabinet, invalidateCabinet } from "../../actions/rewardActions";
import {Button} from "react-materialize";

import Cabinet from "../rewards/Cabinet";
class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, centre } = this.props;
    console.log("this is the componentDidMount props: ", this.props);
    dispatch(fetchCabinet("5e88fce21c9d4400007fc283"));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, centre } = this.props;
    console.log("handleRefresh: ", this.props);
    dispatch(invalidateCabinet(centre));
    dispatch(fetchCabinet(centre));
  }
  render() {
    const { centre, cabDetails, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <p>
          {lastUpdated && (
            <span>
              last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <Button onClick={this.handleRefreshClick}>Refresh</Button>
          )}
        </p>
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
  const { centre, isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  console.log("this is the state: ", state);
  return {
    centre,
    cabDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(CabinetContainer);
