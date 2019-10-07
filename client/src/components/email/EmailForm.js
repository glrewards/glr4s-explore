import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import EmailField from "./EmailField";
import _ from "lodash";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";


class EmailForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={EmailField}
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
                <form onSubmit={this.props.handleSubmit(this.props.onEmailSubmit)}>
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

    errors.from = validateEmails(values.from || "");

    if (!values.title) {
        errors.title = "You must provide a title";
    }
    if (!values.subject) {
        errors.subject = "you must provide subject";
    }
    if (!values.body) {
        errors.body = "You must provide an email body";
    }
    if (!values.from) {
        errors.from = "You must provide a valid email address";
    }

    return errors;
}

//using redux form helper
export default reduxForm({
    validate: validate,
    form: "emailForm",
    destroyOnUnmount: false
})(EmailForm);
