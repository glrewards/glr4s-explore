import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchAllStudents, fetchAllXODStudents} from "../../actions";



function mapStateToProps (state){
    //console.log("StudentList: mapStateToProps() ",state);
    return {students: state.xod.students};
}

export default connect(mapStateToProps,{fetchAllXOSStudents})(XODStudentList);
