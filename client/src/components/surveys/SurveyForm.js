import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";


class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn waves-effect waves-light">
            Cancel<i className="material-icons right">close</i>
          </Link>
          <button
            type="submit"
            className="btn waves-effect waves-light red right"
          >
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //run this first so that, when form loads the check for an empty field is the last one to run

  errors.recipients = validateEmails(values.recipients || "");

  if (!values.title) {
    errors.title = "You must provide a title";
  }
  if (!values.subject) {
    errors.subject = "you must provide subject";
  }
  if (!values.body) {
    errors.body = "You must provide an email body";
  }
  if (!values.recipients) {
    errors.emails = "You must provide at least one valid email address";
  }

  return errors;
}

//using redux form helper
export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
})(SurveyForm);
