//Survey New shows SurveyForm and the Survey Review
import React from 'react';

export default props => {
    let input = props.input;
    let label = props.label;
    let error = props.meta.error;
    let touched = props.meta.touched;

    return (

        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );
};
