import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCabinet, invalidateCabinet } from "../../actions/rewardActions";
import {Button} from "react-materialize";

class CabinetContainer extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, centre } = this.props;
    //console.log("this is the componentDidMount props: ", this.props);
    dispatch(fetchCabinet("5e8e67ed1c9d440000858579"));
  }

  handleRefreshClick(e) {
    e.preventDefault();
    const {dispatch, centre } = this.props;
    //console.log("handleRefresh: ", this.props);
    dispatch(invalidateCabinet(centre));
    dispatch(fetchCabinet(centre));
  }
  render() {
    const { centre, cabDetail, isFetching, lastUpdated } = this.props;
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
  const { cabinet } = state;
  const { centre, isFetching, lastUpdated, cabDetail } = cabinet || {
    isFetching: true
  };
  //console.log("this is the state: ", state);
  return {
    centre,
    cabDetail,
    isFetching,
    lastUpdated
  };
}
export default connect(mapStateToProps)(CabinetContainer);
