import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLineItems, fetchUser } from "../../actions";

class SimpleCartList extends Component {
  constructor(props) {
    super(props);
  }

  renderListItems() {
    console.log();
    return this.props.cart.map((line, index) => {
      console.log(line);
      return (
          <div className="row" key={index}>
            <div className="col s12">
              <ul className="collection">
                <li key={line.variantId} className="collection-item avatar">
                  <img className="circle" src={line.img} />
                  <span className="card-title">{line.productTitle}</span>
                  <div>
                    <ul>
                      <li className="right-aligned">
                        GLRPoints: {line.glrpoints}
                      </li>
                      <li className="right-align">Quantity: {line.quantity}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
      );
    });
  }

  render() {
    return <div className="container">
        {this.renderListItems()}
        <button
            className="btn yellow darken-3 waves-effect waves-light right-aligned"
            onClick={() => {
            }
            }
        >
            Save Order
        </button>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    cart: state.cart.cart
  };
}

export default connect(mapStateToProps)(SimpleCartList);
