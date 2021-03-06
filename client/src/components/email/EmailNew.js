//Survey New shows SurveyForm and the Survey Review
import React, {Component} from 'react';
import EmailForm from './EmailForm'
import EmailFormReview from "./EmailFormReview";
import {reduxForm} from 'redux-form';

class EmailNew extends Component{
    //shorthand for constructor and creating state
    state = {showFormReview: false};


    renderContent() {
        if (this.state.showFormReview){
            return <EmailFormReview
                onCancel = {() => this.setState({showFormReview:false})}
            />
        }
        return (
            <EmailForm
                onEmailSubmit = {() => this.setState({showFormReview: true})}
            />
        )
    }


    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}
export default reduxForm({
    form: 'emailForm'
}) (EmailNew);
