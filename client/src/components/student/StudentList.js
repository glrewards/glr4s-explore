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
                <div key={student._id} className="card lime darken-1 ">
                    <div className="card-content">
                        <span className="card-title">{student.lastName}</span>
                        <p>
                            {student.currentPoints}
                        </p>

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
    console.log("StudentList: mapStateToProps() ",state);
    return {students: state.students};
}

export default connect(mapStateToProps,{fetchAllStudents})(StudentList);
