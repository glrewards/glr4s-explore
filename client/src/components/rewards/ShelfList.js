import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import {Collapsible, CollapsibleItem, Icon} from "react-materialize";

export default class ShelfList extends Component
{
    render() {
        return (
            <Collapsible accordion={false} header="Shelves">
                {this.props.shelves.map(shelf =>
                    <CollapsibleItem node='h2' expanded={true} key={shelf._id} header={shelf.name} icon={<Icon>'place'</Icon>}> Rewards here </CollapsibleItem>
                )}
            </Collapsible>
        )
    }
};

ShelfList.propTypes = {
    shelves: PropTypes.array.isRequired
};


