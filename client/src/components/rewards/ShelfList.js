import React from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'
import { Collapsible, } from "react-materialize";

const ShelfList = ({ shelves, actions }) => (
    <Collapsible>
        {shelves.map(shelf =>
            <Shelf key={shelf.id} todo={shelf} {...actions} />
        )}
    </Collapsible>
);

ShelfList.propTypes = {
    shelves: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.bool.isRequired,
        pointsHigher: PropTypes.number,
        pointsLower: PropTypes.number,
        totalRewards: PropTypes.number.isRequired,
        warningLevel: PropTypes.number
    }).isRequired).isRequired,
    actions: PropTypes.object.isRequired
};

export default ShelfList
