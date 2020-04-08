import { CollapsibleItem, T } from "react-materialize";
import React, { Component } from "react";
import PropTypes, {element} from "prop-types";
import classnames from "classnames";

export default class Shelf extends CollapsibleItem {
  static propTypes = {
    shelf: PropTypes.object.isRequired
  };
  render() {
      let element;
    const shelf = this.props.shelf;
    element = (
      <div >
        <label>{shelf.name}</label>
        <button>Add to Cart</button>
      </div>
    );
    return (
        <li>
            {element}
        </li>

    )
  }
}
