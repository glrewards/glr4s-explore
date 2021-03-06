import React, { Component } from "react";
import { connect } from "react-redux";

// this displays a simple summary and image of the student based on values mapped into the props taken
// from the redux state
class XODStudentAchievementList extends Component {
  constructor(props) {
    super(props);
    this.findRootAchievements = this.findRootAchievements.bind(this);
    this.state = {};

  }

findRootAchievements(achievements) {
    let rootAchievements = undefined;
    if (achievements) {
      rootAchievements = achievements.map(item => {
        return item.rootAchievement;
      });
      return rootAchievements;
    }
  }

  renderTable() {
    let items = this.findRootAchievements(
      this.props.achievements
    );
    return (
      <div>
        <table className="striped responsive-table">
          {this.renderHeader()}
          <tbody>
            {items.map(item => {
              return this.renderRow(item);
            })}
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

  renderRow(item) {
    return (
      <tr key={item.Id}>
        <td>{item.Date}</td>
        <td>{item.AchievementType}</td>
        <td>{item.Activity}</td>
        <td>{item.Subject}</td>
        <td>{item.RecordedBy}</td>
      </tr>
    );
  }

  render() {
    // we need to map through the achievements finding the root achievements and return only the items we want to
    //display

    const items = this.findRootAchievements(
      this.props.achievements
    );
    // now need to build the table
    if (!items) {
      return <p> No activities</p>;
    }
    return <div>
        {this.renderTable(this.props.achievements)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    student: state.xodSingleStudent,
    auth: state.auth,
    school: state.schoolId,
    achievements: state.xodAchievements
  };
}

export default connect(mapStateToProps)(XODStudentAchievementList);
