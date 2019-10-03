import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";
import ProductCard from "./ProductCard";
import './shop.css';

class ProductGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleBackwardClick = this.handleBackwardClick.bind(this);
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
    return (
      <div className="row">
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

  renderPagination() {
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
