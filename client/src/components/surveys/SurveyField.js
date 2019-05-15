//Survey New shows SurveyForm and the Survey Review
import React from 'react';

export default props => {
    console.log(props.input);
    let input = props.input;
    let label = props.label;
    //let meta = props.meta;
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