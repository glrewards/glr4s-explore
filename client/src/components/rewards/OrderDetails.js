import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OrderDetail extends Component {
  render() {
    if (!this.props.lineItems) {
      console.log(this.props);
      return <div>No data</div>;
    }
    return (
      <div>
        <table className="striped">
          <tbody>
            {typeof this.props.lineItems != "undefined" &&
              this.props.lineItems.length > 0 &&
              this.props.lineItems.map(line => {
                return (
                  <tr key={line._id}>
                    <td>
                      {line.memberFirstName + " " + line.memberLastName}
                    </td>
                    <td>
                      {line.productTitle}
                    </td>
                    <td>
                      {line.quantity}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

OrderDetail.propTypes = {
  isAdmin: PropTypes.bool,
  lineItems: PropTypes.array.isRequired
};
