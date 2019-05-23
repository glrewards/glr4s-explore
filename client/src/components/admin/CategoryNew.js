//Survey New shows SurveyForm and the Survey Review
import React, {Component} from 'react';
import CategoryForm from './CategoryForm'
import * as actions from '../../actions';
import {submitCategory} from "../../actions";
import {connect} from "react-redux";
import {reduxForm} from "redux-form";
import {fetchSurveys} from "../../actions";

class CategoryNew extends Component{

    handleSubmit  = (values) => {
        console.log("in handleSubmit",values);
        console.log(actions);
        this.props.submitCategory(values);
    };

    renderContent() {
        return (
            <div>
            <CategoryForm
                onSubmit={this.handleSubmit}
            />
            </div>
        )
    };

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
};

function mapStateToProps(state){
    return {actions: state.actions}
}

export default connect(mapStateToProps,{submitCategory})(CategoryNew);
