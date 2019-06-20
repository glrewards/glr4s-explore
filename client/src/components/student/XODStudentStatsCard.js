import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// this displays a simple summary and image of the student based on values mapped into the props taken
// from the redux state
class XODStudentStatsCard extends Component {
  constructor(props) {
    super(props);
    //this.totalUpRewards = this.totalUpRewards.bind(this);
  }

  static totalUpRewards(achievements) {
    // map reduce the achievements to get a total
    // count the number of activities to get a total
      const count = achievements.length;

      let totalPoints = achievements.map((item) => {
          return item.studentAchievements.Points;
      }).reduce((total,number) => {
          return total + number;
      })
      return totalPoints;
  }
  render() {
    return (
      <div className="card">
        <h5 className="card-title center-align">
          {this.props.student
            ? this.props.student.DisplayName + ": Achievement Summary"
            : ""}
        </h5>
        <div className="card-content">
            <p>Total Number of Achievements:  {this.props.achievements.length}</p>
            <p> Total Points Earned:  {XODStudentStatsCard.totalUpRewards(this.props.achievements)}</p>
          <div className="card-action">

          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps)(XODStudentStatsCard);
