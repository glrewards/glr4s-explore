import React, { Component } from "react";
import {connect} from "react-redux";
import {Button, Icon} from "react-materialize";

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
    let variant =
      this.state.selectedVariant || this.props.product.variants.edges[0].node;
    let variantQuantity = this.state.selectedVariantQuantity || 1;

    return (
        <div className="col s12 m6 l4">
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img
                        className="activator"
                        style={{ maxWidth: "60%", maxHeight: "60%" }}
                        src={this.props.product.featuredImage.src}
                        alt={this.props.product.featuredImage.altText}
                    />

                </div>
                <div className="card-content">
                    <span> <h6>{this.props.product.title}</h6></span>
                    <p> {this.props.product.description}</p>
                  <i className="material-icons right">more_vert</i>
                    <div>
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
                    </div>
                </div>
                <div className="card-action">
                    <Button className="orange darken-1 waves-effect"
                            onClick={() => {
                        this.props.addVariantToStudentCart(
                            this.props.auth._student,
                            this.props.product.id,
                            this.props.product.title,
                            variant.id,
                            variantQuantity,
                            Number(this.props.product.metafield.value),
                            this.props.product.featuredImage.src
                        )
                    }
                    }>Add to Cart
                        <Icon>
                            shopping_basket
                        </Icon>
                    </Button>
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
    );
  }
}
function mapStateToProps(state) {
    return {
        auth: state.auth
        };
}
export default connect(mapStateToProps)(ProductCard);
