import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllXODStudents } from "../../actions";
import { Link } from "react-router-dom";
import M from "materialize-css";
import {HandleProgressBar} from "../ProgressBar";
import {setProgressBar} from "../../actions";

class XODStudentList extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.complete = this.complete.bind(this);
  }

  componentDidMount() {
    this.complete(this.props);

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.complete(this.props);
  }


  handleSelectChange(event) {

    this.props.onSchoolSelected(event.target.value);
    this.props.setProgressBar("OPEN");
    this.props.fetchAllXODStudents(event.target.value);
  }

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>House</th>
          <th>Year</th>
          <th>Id</th>
          <th>Has Achievements</th>
        </tr>
      </thead>
    );
  }

  renderRows() {
    let vals = this.props.students.map(student => {
      return (
          <tr key={student.xodstudent.Id} className="hover">
            <td>
              <Link to={`/school/${this.props.schoolId}/student/${student.xodstudent.Id}`}>
                {student.xodstudent.DisplayName}{" "}
              </Link>
            </td>
            <td>{student.xodstudent.HouseGroup}</td>
            <td>{student.xodstudent.YearGroup}</td>
            <td>{student.xodstudent.Id}</td>
            <td>{student.hasachievements.toString()}</td>
          </tr>
      );
    });
    return vals;
  }

    complete(props){
      props.setProgressBar("");

    }

  render() {

    return (
      <div>
        <div>
          <div className="input-field col s12">
            <span>
              <label>School Identifier</label>
            </span>
            <select
              className="browser-default"
              onChange={this.handleSelectChange}
            >
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="3281101">3281101</option>
              <option value="3281102">3281102</option>
            </select>
          </div>
        </div>
        <div className="divider" />
        <div>
          <table className="responsive-table highlight striped amber accent-2">
            {this.renderHeader()}
            <tbody>{this.renderRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("XODStudentList: mapStateToProps() ", state);
  console.log(state);
  return { schoolId: state.xodschool, students: state.xodstudents };
}

export default connect(
  mapStateToProps,
  { fetchAllXODStudents, setProgressBar}
)(XODStudentList);
