import React, { Component } from "react";
import ShelfList from "../rewards/ShelfList";
import {connect} from "react-redux";

class CentreDashBoard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(<div>Centre dashboard</div>)
    }
        /*
        const { user, cabDetail, isFetching, lastUpdated } = this.props;
        if(!user) return(<div>Fetching</div>);
        return (
            <div>
                <div>
                    {isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>Loading</h2> }
                    {!isFetching && (JSON.stringify(cabDetail) === JSON.stringify({})) && <h2>No Cabinet</h2> }
                    {(JSON.stringify(cabDetail) !== JSON.stringify({})) &&(
                        <div style={{opacity: isFetching ? 0.5:1}}>
                            <ShelfList shelves={cabDetail.shelves}
                                       onAddToCartClickShelf={this.handleAddToCartClick}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
         */
}
export default (CentreDashBoard);