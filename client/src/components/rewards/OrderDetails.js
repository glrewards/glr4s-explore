import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "react-materialize";

export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    if (!this.props.lineItems) {
      console.log(this.props);
      return <div>No data</div>;
    }
    return (
      <div>
        <form>
          <table className="striped">
            <tbody>
              {typeof this.props.lineItems != "undefined" &&
                this.props.lineItems.length > 0 &&
                this.props.lineItems.map(line => {
                  return (
                    <tr key={line._id}>
                      <td>
                        <img
                          className="responsive-img"
                          height="150"
                          width="150"
                          alt={line.productTitle}
                          src={line.img}
                        />
                      </td>
                      <td className="flow-text">
                        {line.memberFirstName + " " + line.memberLastName}
                      </td>
                      <td className="flow-text">{line.productTitle}</td>
                      <td className="flow-text">{line.quantity}</td>
                      {
                        // have to use line._id as each label has to be linked to a unique checkbox and if I
                        // used the rewardId this is not unique given the current nature of the order
                        // which permits duplicate products on different lines
                      }
                      <td>
                        <Checkbox
                          disabled={!this.props.isOpenOrder}
                          id={line._id}
                          type="checkbox"
                          value={line._id}
                          onChange={event => this.props.onDeleteClicked(event)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

OrderDetail.propTypes = {
  isOpenOrder: PropTypes.bool,
  isAdmin: PropTypes.bool,
  lineItems: PropTypes.array.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
};
