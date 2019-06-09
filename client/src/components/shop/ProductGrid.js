import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";
import ProductCard from "./ProductCard";
import {addVariantToStudentCart} from "./GLRcheckout";
import './shop.css';

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackwardClick = this.handleBackwardClick.bind(this);
    //this.addVariantToStudentCart = addVariantToStudentCart.bind(this);
  }

  handleForwardClick(event) {
    this.props.fetchProducts(event.target.id, false);
  }
  handleBackwardClick(event) {
    let backward = true;
    this.props.fetchProducts(event.target.id, backward);
  }
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    console.log("in render props: ", this.props);
    console.log("in render state: ", this.state);
    /*
    //original working render
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
    */
    return (
      <div className="Product-wrapper">
        {console.log("rendering Product Card: state: ", this.state)}
        {console.log("rendering Product Card: props: ", this.props)}
        {this.props.products.prods.map(product => (
          <ProductCard
            user={this.props.auth}
            addVariantToStudentCart={this.props.onAddToCartClick}
            key={product.node.id.toString()}
            product={product.node}
          />
        ))}
      </div>
    );
  }

  renderGLRPoints(product) {
    if (!this.props.user._student) {
      //this should not happen but it means this user is not assigned a student role
      return (
        <p className="blue-text flow-text">
          GLRPoints: cannot be displayed. User not Student
          <i className="material-icons right-aligned">error</i>
        </p>
      );
    }

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

  renderPagination() {
    console.log("renderPagination", this.props);
    if (!this.props.products.page) {
      return;
    }
    //only carry on if we have the data

    let prevClass = "disabled";
    if (this.props.products.page.hasPreviousPage) {
      prevClass = "wave-effect";
    }
    let nextClass = "wave-effect";
    if (!this.props.products.page.hasNextPage) {
      nextClass = "disabled";
    }
    // don't show pagination if not required
    if (
      this.props.products.page.hasPreviousPage === false &&
      this.props.products.page.hasNextPage === false
    ) {
      return;
    }

    return (
      <ul className="pagination yellow darken-4 valign-wrapper">
        <li key="back" className={prevClass}>
          <a
            href="#1"
            key="backward"
            id={this.props.products.firstCursor}
            onClick={this.handleBackwardClick}
          >
            <i
              className="material-icons disabled"
              key="backward"
              id={this.props.products.firstCursor}
            >
              chevron_left
            </i>
          </a>
        </li>
        <li key="forward" className={nextClass}>
          <a
            href="#1"
            key="forward"
            id={this.props.products.lastCursor}
            onClick={this.handleForwardClick}
          >
            <i
              className="material-icons disabled"
              key="forward"
              id={this.props.products.lastCursor}
            >
              chevron_right
            </i>
          </a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.props.products ? this.renderPagination() : ""}

        {//remember render happens before componentdidmount so this first time round we do not want to try and
        //parse arrays etc
        this.props.products ? this.renderProducts() : ""}
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
