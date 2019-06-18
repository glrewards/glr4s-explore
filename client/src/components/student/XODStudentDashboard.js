import React from "react";
import XODStudentList from './XODStudentList';
import {selectSchool} from "../../actions/XODSchoolActions";
import { connect } from "react-redux";




function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onSchoolSelected: (schoolId) => {
            dispatch(selectSchool(schoolId))
        }
    }
}

const XODStudentDashboard = connect(
    mapStateToProps,
    mapDispatchToProps
)(XODStudentList)

export default connect(mapStateToProps)(XODStudentDashboard);
