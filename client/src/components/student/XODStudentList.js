import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllXODStudents } from "../../actions";
import { Link } from "react-router-dom";
import {HandleProgressBar} from "../ProgressBar";
import {setProgressBar} from "../../actions";
import PaginationBar from "../PaginationBar";
import {fetchXODStudentCount} from "../../actions";

class XODStudentList extends Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }


  handleSelectChange(event) {
    this.props.onSchoolSelected(event.target.value);
    this.props.fetchXODStudentCount(event.target.value);
    //get the first page
    this.props.fetchAllXODStudents(event.target.value,0,this.props.limit);
  }


  handlePageClick(event){
    //this is where we page through the student list. This is fired because we have passed it as the function to
    //trigger when the user interacts with the pagination bar. Meaning we manage data here - not inside the pagination
    //bar
    this.props.fetchAllXODStudents(this.props.schoolId,event,this.props.limit);
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
        <div><PaginationBar
            total = {this.props.total}
            limit = {this.props.limit}
            handlePageClick = {this.handlePageClick}

        /></div>
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
  return {

    total: state.ui.totalstudents,
    schoolId: state.xodschool,
    students: state.xodstudents,
    limit:  25
  };
}

export default connect(
  mapStateToProps,
  { fetchAllXODStudents, setProgressBar,fetchXODStudentCount}
)(XODStudentList);
