import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchXODStudent } from "../../actions";
import { fetchXODStudentAchievements } from "../../actions";
import XODStudentIdCard from "./XODStudentIdCard";
import XODStudentActivitiesList from "./XODStudentActivitiesList";
import XODStudentStatsCard from "./XODStudentStatsCard";
import { Collapsible, CollapsibleItem } from "react-materialize";

class StudentProfileDashboard extends Component {

  componentDidMount() {
    this.props.fetchXODStudent(
      this.props.match.params.schoolId,
      this.props.match.params.studentId
    );
    this.props.fetchXODStudentAchievements(
      this.props.match.params.schoolId,
      this.props.match.params.studentId
    );
  }


  render() {
    return (
      <div>
        <div className="row light-blue lighten-4">
          <div className="col s12 light-blue lighten-4">
            <div className="col s4">
              <XODStudentIdCard />
            </div>
            <div className="col s8">
              {this.props.xodachievements.length > 0 ? (
                <XODStudentStatsCard />
              ) : (
                "No Activities this year"
              )}
            </div>
          </div>
          <div className="col s12 m12 l12 light-blue lighten-4">
            <p>s12 m5</p>
            <Collapsible popout>
              <CollapsibleItem header="Open Activities">
                <span>
                  <XODStudentActivitiesList />
                </span>
              </CollapsibleItem>
              <CollapsibleItem header="Closed Activities" />
              <CollapsibleItem header="Open Shop Orders">
                <p>Stuff here</p>
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
        <div className="row light-blue lighten-4">
          <div className="col s12 m6 l3">
            <p> s12 m6 l3 </p>
          </div>
          <div className="col s12 m6 l3">
            <p> s12 m6 l3 </p>
          </div>
          <div className="col s12 m6 l3">
            {" "}
            <p> s12 m6 l3 </p>
          </div>
          <div className="col s12 m6 l3">
            <p> s12 m6 l3 </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    xodschool: state.xodschool,
    xodselectedstudent: state.xodSingleStudent,
    xodachievements: state.xodAchievements
  };
}

export default connect(
  mapStateToProps,
  { fetchXODStudent, fetchXODStudentAchievements}
)(StudentProfileDashboard);
