import React, { Component } from "react";
import VariantSelector from "./VariantSelector";
import {connect} from "react-redux";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.findImage = this.findImage.bind(this);
  }

  componentWillMount() {
    // removed this code as we do not offer options on products
    /*
        this.props.product.options.forEach((selector) => {
            this.setState({
                selectedOptions: { [selector.name]: selector.values[0] }
            });
        });
        */
  }

  findImage(images, variantId) {
    const primary = images[0];

    const image = images.filter(function(image) {
      return image.variant_ids.includes(variantId);
    })[0];

    return (image || primary).src;
  }

    renderGLRPoints() {
        if (!this.props.auth._student) {
            //this should not happen but it means this user is not assigned a student role
            return (
                <p className="blue-text flow-text">
                    GLRPoints: cannot be displayed. User not Student
                    <i className="material-icons right-aligned">error</i>
                </p>
            );
        }

        if (this.props.product.metafield.value < this.props.auth._student.currentPoints) {
            return (
                <p className="blue-text flow-text">
                    GLRPoints: {this.props.product.metafield.value}
                    <i className="material-icons right-aligned">check</i>
                </p>
            );
        }
        return (
            <p className="red-text flow-text align">
                GLRPoints: {this.props.product.metafield.value}
                <i className="material-icons right-aligned">clear</i>
            </p>
        );
    }

  // removed options logic as we don't use it

  handleOptionChange(event) {
    const target = event.target;
    let selectedOptions = this.state.selectedOptions;
    selectedOptions[target.name] = target.value;

    const selectedVariant = this.props.product.variants.edges.find(
      variant => {
        return variant.node.selectedOptions.every(selectedOption => {
          return selectedOptions[selectedOption.name] === selectedOption.value;
        });
      }
    ).node;

    this.setState({
      selectedVariant: selectedVariant,
      selectedVariantImage: selectedVariant.image.src
    });
  }

  handleQuantityChange(event) {
    this.setState({
      selectedVariantQuantity: event.target.value
    });
  }

  render() {
    //let variantImage = this.state.selectedVariantImage || this.props.product.variants.edges[0].node.src
    let variantImage = this.props.product.images.edges[0].node.src;
    let variant =
      this.state.selectedVariant || this.props.product.variants.edges[0].node;
    let variantQuantity = this.state.selectedVariantQuantity || 1;

    return (
      <div className="row">
        <div className="col s12">
          <div className="card horizontal">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                className="activator"
                style={{ maxWidth: "80%", maxHeight: "80%" }}
                src={this.props.product.featuredImage.src}
                alt={this.props.product.featuredImage.altText}
              />
            </div>
            <div className="card-content">
              <span className="card-title activator">
                {this.props.product.title}
                <i className="material-icons right">more_vert</i>
              </span>
              <div>
                <h5 className="Product__title">{this.props.product.title}</h5>
                <span className="Product__price">{this.renderGLRPoints()}</span>
                <label className="Product__option">
                  Quantity
                  <input
                    min="1"
                    type="number"
                    defaultValue={variantQuantity}
                    onChange={this.handleQuantityChange}
                  />
                </label>
                <div className="right-aligned">
                  <button
                    className="btn yellow darken-3 waves-effect waves-light"
                    onClick={() => {
                        this.props.addVariantToStudentCart(
                            this.props.auth._student,
                            this.props.product.id,
                            this.props.product.title,
                            variant.id,
                            variantQuantity,
                            this.props.product.metafield.value,
                            this.props.product.featuredImage.src
                        )
                    }
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                {this.props.product.title}
                <i className="material-icons right">close</i>
              </span>
              <p> {this.props.product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
        };
}
export default connect(mapStateToProps)(ProductCard);
