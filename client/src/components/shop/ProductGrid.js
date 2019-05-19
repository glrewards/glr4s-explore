import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchProducts} from "../../actions";

const query = gql`
  query query {
    shop {
      name
      description
      products(first:5) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            options {
              id
              name
              values
            }
            variants(first: 5) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    src
                  }
                  price
                }
              }
            }
            images(first: 5) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;


class ProductGrid extends Component{


    componentDidMount(){
        this.props.fetchProducts();
    }


    renderSurveys(){
        return this.props.surveys.reverse().map(survey =>{
            return(
                <div key={survey._id} className="card lime darken-1 ">
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
                        <a className="red-text">Yes: {survey.yes}</a>
                        <a className="red-text">No: {survey.no}</a>
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
    return {products: state.products};
}

export default connect(mapStateToProps,{fetchProducts})(ProductGrid);
