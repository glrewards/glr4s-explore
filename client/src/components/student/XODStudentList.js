import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchAllXODStudents} from "../../actions";
import {Link} from "react-router-dom";

class XODStudentList extends Component {

    componentDidMount() {
        this.props.fetchAllXODStudents(3281102);
    }

    renderHeader(){
        return (
        <thead>

        <tr>
            <th>Name</th>
            <th>House</th>
            <th>Year</th>
            <th>Id</th>
        </tr>

        </thead>)

    }

    renderRows(){
        return this.props.students.map(student => {
            return (

                <tr key={student.Id} className="hover">
                    <td>
                        <Link to={this.props.auth ? "/" : "/"}>{student.DisplayName} </Link>
                    </td>
                    <td>
                        {student.HouseGroup}
                    </td>
                    <td>
                        {student.YearGroup}
                    </td>
                    <td>{student.Id}</td>
                </tr>


            );
        });
    }
    render(){
        console.log(this.props.students);
        return (
            <div>
                <table className="responsive-table highlight striped amber accent-2">
                    {this.renderHeader()}
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }

}
function mapStateToProps(state) {
    console.log("XODStudentList: mapStateToProps() ", state);
    return {students: state.xodstudents};
}

export default connect(mapStateToProps,{fetchAllXODStudents})(XODStudentList);
