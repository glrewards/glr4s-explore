import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";
import M from "materialize-css";

class ProductGrid extends Component {
  componentDidMount() {
    M.AutoInit();
    this.props.fetchProducts();
  }

  renderProducts() {
    return this.props.products.map(product => {
      return (
        <div className="row" key={product.node.id}>
          <div className="col s12">
            <div key={product.node.id} className="card horizontal ">
              <div className="card-image waves-effect waves-block waves-light">
                <img
                  className="activator"
                  style={{ maxWidth: "80%", maxHeight: "80%" }}
                  src={product.node.featuredImage.src}
                  alt={product.node.featuredImage.altText}
                />
                <p className="blue-text flow-text">
                  GLRPoints: {product.node.metafield.value}
                </p>
              </div>
              <div className="card-content">
                <span className="card-title activator">
                  {product.node.title}
                  <i className="material-icons right">more_vert</i>
                </span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  {product.node.title}
                  <i className="material-icons right">close</i>
                </span>
                <p> {product.node.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderProducts()}</div>;
  }
}

function mapStateToProps(state) {
  console.log(state.products);
  return { products: state.products };
}

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductGrid);
