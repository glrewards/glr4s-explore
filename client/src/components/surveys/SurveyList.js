import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchSurveys} from "../../actions";

class SurveyList extends Component{


    componentDidMount(){
        this.props.fetchSurveys();
    }


    renderSurveys(){
        return this.props.surveys.reverse().map(survey =>{
           return(
               <div key={survey._id} className="card yellow darken-1 ">
                   <div className="card-content">
                       <span className="card-title">{survey.title}</span>
                       <p>
                           {survey.body}
                       </p>
                       <p className="right">
                           Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                       </p>

                   </div>
                   <div className="card-action">
                       <button className="button">Yes: {survey.yes}</button>
                       <button className="button">No: {survey.no}</button>
                   </div>
               </div>

           );
        });
    }
    render(){
        return (
          <div>
              {this.renderSurveys()}
          </div>
        );
    }
}

function mapStateToProps (state){
    return {surveys: state.surveys};
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList);
