import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Cabinet extends Component {
    render() {
        return (
            <ul>
                {this.props.shelves.map((shelf, i) => (
                    <li key={i}>{shelf.name}</li>
                ))}
            </ul>
        )
    }
}

Cabinet.propTypes = {
    shelves: PropTypes.array.isRequired
}