import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
//import CategoryField from "./CategoryField";

class CategoryForm extends Component {
    renderFields() {
        return (
            <div>
            <label>Category Name</label>
                <Field
                    key="1"
                    component="input"
                    type="text"
                    name="categoryType"
                />
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
                        Save Category
                        <i className="material-icons right">save</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.title = "You must provide a category";
    }
    return errors;
}

//using redux form helper
CategoryForm = reduxForm({
    validate: validate,
    form: "categoryForm"
})(CategoryForm);

export default CategoryForm;
