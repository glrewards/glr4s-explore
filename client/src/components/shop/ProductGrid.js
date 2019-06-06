import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";
import M from "materialize-css";

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //M.AutoInit();
    //console.log(this.props);
    this.props.fetchProducts();
  }
  componentWillMount() {
    console.log()
  }

  renderProducts() {
    console.log("in render: ", this.props);
    return this.props.products.prods.map(product => {
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
                {this.renderGLRPoints(product)}
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

  renderGLRPoints(product) {
    if (product.node.metafield.value < this.props.user._student.currentPoints) {
      return (
        <p className="blue-text flow-text">
          GLRPoints: {product.node.metafield.value}
          <i className="material-icons right-aligned">check</i>
        </p>
      );
    }
    return (
      <p className="red-text flow-text align">
        GLRPoints: {product.node.metafield.value}
        <i className="material-icons right-aligned">clear</i>
      </p>
    );
  }

  render() {
    return (
      <div>
        <div>
          <ul className="pagination blue-grey lighten-1">
            <li className="disabled">
              <a href="#!">
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            <li className="waves-effect">
              <a href="#!">
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>

        {//remember render happens before componentdidmount so this first time round we do not want to try and
          //parse arrays etc
          this.props.products ? this.renderProducts(): ""}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    user: state.auth
  };
}

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductGrid);
