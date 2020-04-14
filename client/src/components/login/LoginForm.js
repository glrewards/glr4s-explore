import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import {Button} from 'react-materialize';

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
        const divStyle = {
            "border-radius": '25px',
            padding: '50px'

        };
        return (
            <div style={divStyle} className="blue lighten-5">
                <form  onSubmit={handleSubmit}>
                    {this.renderFields()}
                    <Button
                        type="submit"
                        className="btn col s12 amber darken-4 waves-effect waves-light right">
                        Login
                        <i className="material-icons right">send</i>
                    </Button>
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
