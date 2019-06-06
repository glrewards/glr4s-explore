//TODO: this was copied from survey list and it is not finished. it is a component that is fed a graphql
//TODO: customer id and displays the draft orders. It also needs pagination management


import React, {Component} from "react";
import {connect} from 'react-redux';

class DraftOrderList extends Component{


    componentDidMount(){
        console.log("in componentDidMount()");
        this.props.fetchDraftOrders();
    }


    renderCategories(){
        console.log(this.props.draftorders);
        return this.props.draftorders.reverse().map(draftOrder =>{
            return(
                <li key={category._id} className="collection-item">{category.categoryType}</li>
            );
        });
    }
    render(){
        return (
            <div>
                <ul className="collection">
                    {this.renderCategories()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps (state){
    //console.log("category list state: ", state);
    return {categories: state.categories};
}

export default connect(mapStateToProps,{fetchCategories})(DraftOrderList);
