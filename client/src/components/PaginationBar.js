import React, {Component} from "react";
import {connect} from "react-redux";
import {Pagination} from "react-materialize";

class PaginationBar extends Component{


    constructor(props){
        super(props);
        this.state = {};
        this.howManyPages = this.howManyPages.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    // assume we receive the total number of items, the current page and the page size from the parent component


    howManyPages(total,limit){
        return Math.ceil(total/limit);
    }

    handlePageClick(event){
        this.props.handlePageClick(event);
    }


    render(){
        console.log(this.props.total);
        return(
        <Pagination items={this.howManyPages(this.props.total,this.props.limit)} activePage={1} maxButtons={8} onSelect={this.handlePageClick}/>
        )
    }
}

function mapStateToProps(state) {
    return {
        student: state.xodSingleStudent,
        auth: state.auth,
        school: state.schoolId
    };
}

export default connect(mapStateToProps)(PaginationBar);


