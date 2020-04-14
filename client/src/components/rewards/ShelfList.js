import React, { Component } from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";
import { Collapsible, CollapsibleItem, Icon, Button } from "react-materialize";
import RewardList from "./RewardList";

export default class ShelfList extends Component {
  render() {
    return (
      <Collapsible accordion={true} header="Shelves">
        {this.props.shelves.map(shelf => (
          <CollapsibleItem
            node="h3"
            expanded={true}
            key={shelf.name}
            header={shelf.name}
          ><img alt="temp" src={shelf.imgURL} height="15%" width="15%" />
            <div>
              <table className="striped responsive-table">
                <tbody>
                  {typeof shelf.rewardItems != "undefined" && (shelf.rewardItems.length > 0) &&
                    shelf.rewardItems.map(reward => {
                      console.log(reward);
                      return (
                        <tr key={reward._id}>
                          <td>
                            {typeof reward._shopifyProduct != "undefined" &&
                              reward._shopifyProduct.image.src && (
                                <img height="150" width="150"
                                  alt="temp"
                                  src={reward._shopifyProduct.image.src}
                                />
                              )}
                          </td>
                          <td><h5>{reward._shopifyProduct.title}</h5></td>
                          <td><h5 className="center-align"> In Stock: {reward.count}</h5></td>

                          <td>
                            <Button className="amber darken-4" waves="purple">
                              Add<Icon right>add_shopping_cart</Icon>
                            </Button>
                            <Button
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
  shelves: PropTypes.array.isRequired
};
