import React, { Component } from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";
import { Collapsible, CollapsibleItem, Icon, Button } from "react-materialize";
import RewardList from "./RewardList";

export default class ShelfList extends Component {
  render() {
    return (
      <Collapsible accordion={false} header="Shelves">
        {this.props.shelves.map(shelf => (
          <CollapsibleItem
            node="h2"
            expanded={true}
            key={shelf._id}
            header={shelf.name}
            icon={<Icon>'place'</Icon>}
          >
            <div>
              <table className="striped responsive-table">
                <thead>
                  <th>Image</th>
                  <th>Name</th>
                  <th> In Stock </th>
                  <th>Buy Now</th>
                  <th>Vote For</th>
                </thead>
                <tbody>
                  {console.log(JSON.stringify(shelf.rewardItems))}
                  {typeof shelf.rewardItems != "undefined" &&
                    shelf.rewardItems.map(reward => {
                      return (
                        <tr>
                          <td>
                            {typeof reward._shopifyProduct != "undefined" &&
                              reward._shopifyProduct.image.src && (
                                <img height="100"
                                  alt="temp"
                                  src={reward._shopifyProduct.image.src}
                                />
                              )}
                          </td>
                          <td>{reward.name}</td>
                          <td>{reward.count}</td>

                          <td>
                            <Button className="amber darken-4" waves="purple">
                              Add<Icon right>add_shopping_cart</Icon>
                            </Button>
                          </td>
                          <td>
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
