import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapsible, CollapsibleItem, Icon, Button } from "react-materialize";

export default class ShelfList extends Component {
  render() {
    if (!this.props.shelves) {
      console.log(this.props);
      return <div>No data</div>;
    }
    return (
      <Collapsible accordion={true} header="Shelves">
        {this.props.shelves.map(shelf => (
          <CollapsibleItem
              node="h3"
              expanded={true}
              key={shelf.name}
              header={shelf.name}
          >
            <img alt="temp" src={shelf.imgURL} height="15%" width="15%"/>
            <div>
              <table className="striped">
                <tbody>
                  {typeof shelf.rewardItems != "undefined" &&
                    shelf.rewardItems.length > 0 &&
                    shelf.rewardItems.map(reward => {
                      return (
                        <tr key={reward._id}>
                          <td>
                            {typeof reward._shopifyProduct != "undefined" &&
                              reward._shopifyProduct.image.src && (
                                <img
                                    className="responsive-img"
                                  height="150"
                                  width="150"
                                  alt="temp"
                                  src={reward._shopifyProduct.image.src}
                                />
                              )}
                          </td>
                          <td>
                            <h5>{reward._shopifyProduct.title}</h5>
                          </td>
                          <td>
                            <h5 className="center-align">
                              {" "}
                              In Stock: {reward.count}
                            </h5>
                          </td>

                          <td>
                            <Button
                              disabled={(this.props.isAdmin) || (reward.count === 0)}
                              className="amber darken-4"
                              waves="purple"
                              onClick={() => {
                                this.props.onAddToCartClickShelf(
                                  reward._id,
                                  reward._shopifyProduct.title,
                                  reward._shopifyProduct.variants[0].id, //TODO: just taking the first variant for now
                                  1,  //setting to 1 as there is no other option for the user
                                  reward._shopifyProduct.points,
                                  reward._shopifyProduct.image.src
                                );
                              }}
                            >
                              Add<Icon right>add_shopping_cart</Icon>
                            </Button>
                            <Button
                              disabled={this.props.isAdmin}
                              className="col s12 amber darken-4"
                              waves="purple"
                            >
                              Fav!<Icon right>favorite</Icon>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </CollapsibleItem>
        ))}
      </Collapsible>
    );
  }
}

ShelfList.propTypes = {
  isAdmin: PropTypes.bool,
  shelves: PropTypes.array.isRequired,
  onAddToCartClickShelf: PropTypes.func.isRequired
};
