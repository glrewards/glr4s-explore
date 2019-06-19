import React, { Component } from "react";
import { connect } from "react-redux";
import Studentist from "./StudentList";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { fetchXODStudent } from "../../actions";
import StudentIdCard from "./StudentIdCard";
class StudentProfileDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.match.params);
    this.props.fetchXODStudent(
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
            <StudentIdCard />
          </div>
          <div className="col s12 m8 l10 yellow lighten-1">
            <p>s12 m5</p>
            <ul className="collapsible expandable amber accent-2">
              <li>
                <div className="collapsible-header transparent active">
                  Completed Activities
                </div>
                <div className="collapsible-body">
                  <span>
                    <table className="striped responsive-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Item Name</th>
                          <th>Item Price</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Alvin</td>
                          <td>Eclair</td>
                          <td>$0.87</td>
                        </tr>
                        <tr>
                          <td>Alan</td>
                          <td>Jellybean</td>
                          <td>$3.76</td>
                        </tr>
                        <tr>
                          <td>Jonathan</td>
                          <td>Lollipop</td>
                          <td>$7.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <i className="material-icons">place</i>Open Activities
                </div>
                <div className="collapsible-body">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
              <li>
                <div className="collapsible-header">
                  <i className="material-icons">whatshot</i>Shop Orders
                </div>
                <div className="collapsible-body">
                  <span>Lorem ipsum dolor sit amet.</span>
                </div>
              </li>
            </ul>
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
  { fetchXODStudent }
)(StudentProfileDashboard);
