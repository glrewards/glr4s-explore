import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchAllStudents} from "../../actions";

class StudentList extends Component{


    componentDidMount(){
        console.log("in componentDidMount");
        this.props.fetchAllStudents();
    }


    renderStudents(){
        console.log(this.props);

        return this.props.students.reverse().map(student =>{
            return(
                <div key={student._id} className="card grey lighten-1">
                    <div className="card-content">
                        <span className="card-title">{student.firstName} {student.lastName} - Year: {student.year}</span>
                        <div className="card grey lighten-3">Activities</div>
                        <div className="card grey lighten-3">
                            <div className="card-content">
                                <div className="card-tabs">
                                    <ul className="tabs tabs-fixed-width grey lighten-3">
                                        <li className="tab">Current Points: {student.currentPoints}</li>
                                        <li className="tab">Max Points: {student.maxPoints}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-action">
                        <a className="red-text">School</a>
                        <a className="red-text">Classes</a>
                        <a className="red-text">Orders</a>
                    </div>

                </div>

            );
        });
    }
    render(){
        return (
            <div>
                {this.renderStudents()}
            </div>
        );
    }
}

function mapStateToProps (state){
    //console.log("StudentList: mapStateToProps() ",state);
    return {students: state.students};
}

export default connect(mapStateToProps,{fetchAllStudents})(StudentList);
