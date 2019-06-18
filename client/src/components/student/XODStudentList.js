import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllXODStudents } from "../../actions";
import { Link } from "react-router-dom";
import M from "materialize-css";

class XODStudentList extends Component {
  constructor(props) {
    super(props);
      document.addEventListener("DOMContentLoaded", function() {
          var elems = document.querySelectorAll("select");
          var instances = M.FormSelect.init(elems);
      });
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems);
    });
  }

  handleSelectChange(event) {
      this.props.onSchoolSelected(event.target.value);
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
        </tr>
      </thead>
    );
  }

  renderRows() {
    return this.props.students.map(student => {
      return (
        <tr key={student.Id} className="hover">
          <td>
            <Link to={`/school/${this.props.schoolId}/student/${student.Id}`}>{student.DisplayName} </Link>
          </td>
          <td>{student.HouseGroup}</td>
          <td>{student.YearGroup}</td>
          <td>{student.Id}</td>
        </tr>
      );
    });
  }
  render() {
    console.log(this.props.students);
    return (
      <div className="container">
        <div className="container">
          <div className="input-field col s12">

              <span><label>School Identifier</label></span>
            <select className="browser-default" onChange={this.handleSelectChange}>
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
  { fetchAllXODStudents }
)(XODStudentList);
