import React, { Component } from "react";
import { connect } from "react-redux";
import Studentist from "./StudentList";
import { Link } from "react-router-dom";
import { fetchXODStudent } from "../../actions";
import { fetchXODStudentAchievements } from "../../actions";
import XODStudentIdCard from "./XODStudentIdCard";
import XODStudentActivitiesList from "./XODStudentActivitiesList";
import { Collapsible, CollapsibleItem } from "react-materialize";
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

  render() {
    return (
      <div>
        <div className="row orange lighten-5">
          <div className="col s12 orange lighten-1">
            <p>s12</p>
            <p> Chart HERE</p>
          </div>
          <div className="col s12 m4 l2 amber lighten-3">
            <XODStudentIdCard />
          </div>
          <div className="col s12 m8 l10 yellow lighten-1">
            <p>s12 m5</p>
            <Collapsible popout>
              <CollapsibleItem header="Open Activities">
                <span>
                  <XODStudentActivitiesList />
                </span>
              </CollapsibleItem>
              <CollapsibleItem header="Closed Activities">
              </CollapsibleItem>
              <CollapsibleItem header="Open Shop Orders">
                <p>Stuff here</p>
              </CollapsibleItem>
            </Collapsible>
          </div>
        </div>
        <div className="row amber darken-2">
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
    xodselectedstudent: state.xodSingleStudent
  };
}

export default connect(
  mapStateToProps,
  { fetchXODStudent, fetchXODStudentAchievements }
)(StudentProfileDashboard);
