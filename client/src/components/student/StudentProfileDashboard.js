import React, { Component } from "react";
import { connect } from "react-redux";
import Studentist from "./StudentList";
import { Link } from "react-router-dom";
import { fetchXODStudent } from "../../actions";
import { fetchXODStudentAchievements } from "../../actions";
import XODStudentIdCard from "./XODStudentIdCard";
import XODStudentActivitiesList from "./XODStudentActivitiesList";
import XODStudentStatsCard from "./XODStudentStatsCard";
import XODStudentSummaryCharts from "./XODStudentSummaryCharts";
import {setProgressBar} from "../../actions";
import { Collapsible, CollapsibleItem } from "react-materialize";
import {HandleProgressBar} from "../ProgressBar";

class StudentProfileDashboard extends Component {
  constructor(props) {
    super(props);

  }

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




  componentWillUpdate(nextProps, nextState, nextContext) {


  }


  render() {
    return (
      <div>
        <div className="row orange">
          <div className="col s12 orange lighten-2">
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
          <div className="col s12 m12 l12 amber">
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
        <div className="row amber darken-2">
          <XODStudentSummaryCharts />
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
  { fetchXODStudent, fetchXODStudentAchievements, setProgressBar }
)(StudentProfileDashboard);
