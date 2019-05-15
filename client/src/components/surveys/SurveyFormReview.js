import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import * as actions from '../../actions';

import {withRouter} from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          {
            //we now need to get the actual values
            formValues[field.name]
          }
        </div>
      </div>
    );
  });
  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn flat" onClick={onCancel}>
        Back
          <i className="material-icons right">arrow_back</i>
      </button>
        <button
            onClick={() => submitSurvey(formValues,history)}
            className="btn waves-effect waves-light red right">
            Send Survey
            <i className="material-icons right">email</i>
        </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
