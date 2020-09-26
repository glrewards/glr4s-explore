import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapsible, CollapsibleItem, Icon, Button, MediaBox } from "react-materialize";

export default class ShelfList extends Component {
  render() {
    console.log('temp');
    console.log(this.props);
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
              <img alt="temp" src={shelf.imgURL} height="15%" width="15%" />
              <div>
                <table className="striped">
                  <tbody>
                    {typeof shelf.rewardItems != "undefined" &&
                      shelf.rewardItems.length > 0 &&
                      shelf.rewardItems.filter((item) => {
                        if(!this.props.favOnly){
                          console.log("not fav only");
                          return true;
                        }else {
                          console.log("fav only");
                          //check if it is a fav
                          return this.props.favourites.find( (fav) => {
                            console.log("checking: ");
                            return fav._rewardId === item._id;
                          })
                        }
                          }
                      ).map(reward => {
                        return (
                          <tr key={reward._id}>
                            <td>
                              {typeof reward._shopifyProduct != "undefined" &&
                                reward._shopifyProduct.image.src && (
                                    <MediaBox id={reward._id}>
                                  <img
                                    className="responsive-img"
                                    height="150"
                                    width="150"
                                    alt="temp"
                                    src={reward._shopifyProduct.image.src}
                                  />
                                    </MediaBox>
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
                                disabled={
                                  !this.props.isMember || reward.count === 0
                                }
                                className="yellow darken-2"
                                waves="purple"
                                onClick={() => {
                                  this.props.onAddToCartClickShelf(
                                    reward._id,
                                    reward._shopifyProduct.title,
                                    reward._shopifyProduct.variants[0].id, //TODO: just taking the first variant for now
                                    1, //setting to 1 as there is no other option for the user
                                    reward._shopifyProduct.points,
                                    reward._shopifyProduct.image.src
                                  );
                                }}
                              >
                                Add<Icon right>add_shopping_cart</Icon>
                              </Button>
                              <Button
                                disabled={!this.props.isMember}
                                className={
                                  this.props.favourites.find(item => {
                                    return item._rewardId === reward._id;
                                  })
                                    ? "blue darken-3"
                                    : "yellow darken-2"
                                }
                                waves="purple"
                                onClick={() => {
                                  this.props.onClickFavourites(
                                    !this.props.favourites.find(item => {
                                      return item._rewardId === reward._id;
                                    }),
                                    reward._id
                                  );
                                }}
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
  favOnly: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  isMember: PropTypes.bool,
  favourites: PropTypes.array,
  shelves: PropTypes.array.isRequired,
  onAddToCartClickShelf: PropTypes.func.isRequired,
  onClickFavourites: PropTypes.func.isRequired
};
