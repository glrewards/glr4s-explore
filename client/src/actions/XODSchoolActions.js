//types

import axios from "axios";

export const SELECT_SCHOOL = 'SELECT_SCHOOL'

/*
 * action creators
 */

export function selectSchool(schoolId) {
    return { type: SELECT_SCHOOL, schoolId }
}


