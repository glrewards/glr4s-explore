import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ShelfList from "./ShelfList";

// this displays a simple summary and image of the student based on values mapped into the props taken
// from the redux state
export default class RewardList extends Component {

    renderTable() {

        return (
            <div>
                <table className="striped responsive-table">
                    {this.renderHeader()}
                    <tbody>
                    {console.log("Reward List: ", this.props.rewards)}
                    </tbody>
                </table>
            </div>
        );
    }

    renderHeader() {
        return (
            <thead>
            <tr>
                <th>Date</th>
                <th>Achievement Type</th>
                <th>Activity</th>
                <th>Subject</th>
                <th>Recorded By</th>
            </tr>
            </thead>
        );
    }

    renderRow(reward) {
        return (
            <tr key={reward.name}>
                <td>{reward.name}</td>
            </tr>
        );
    }

    render() {
        return <div> {this.renderTable(this.props.rewards)}</div>;
    }
}
RewardList.propTypes = {
    rewards: PropTypes.array.isRequired
};
