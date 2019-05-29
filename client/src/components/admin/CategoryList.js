import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchCategories} from "../../actions";

class CategoryList extends Component{


    componentDidMount(){
        console.log("in componentDidMount()");
        this.props.fetchCategories();
    }


    renderCategories(){
        console.log(this.props.categories);
        return this.props.categories.reverse().map(category =>{
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
    console.log("category list state: ", state);
    return {categories: state.categories};
}

export default connect(mapStateToProps,{fetchCategories})(CategoryList);
