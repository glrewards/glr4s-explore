import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class LoginForm extends Component {
    renderFields() {
        return (<div>
            <div>
                <label>User Name</label>
                <Field
                    key="username"
                    component="input"
                    type="text"
                    name="username"
                />
            </div>
                <div>
                    <label>password</label>
                    <Field
                        key="password"
                        component="input"
                        type="password"
                        name="password"
                    />
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    {this.renderFields()}
                    <button
                        type="submit"
                        className="btn waves-effect waves-light red right">
                        Login
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.title = "You must provide a username";
    }
    if (!values.password){
        errors.title ="you must provide a password";
    }
    return errors;
}

//using redux form helper
LoginForm = reduxForm({
    validate: validate,
    form: "loginForm"
})(LoginForm);

export default LoginForm;
