import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLineItems, fetchUser } from "../../actions";

class LineItemsList extends Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
  }

  componentDidMount() {
    if (!this.props.auth) {
      this.props.fetchUser();
    }
    this.props.fetchLineItems(this.props.auth._student);
  }

  renderListItems() {
    return this.props.lineItems.map(line => {
      return (
        <div key={line._id} className="card yellow darken-1 ">
          <div className="card-content">
            <span className="card-title">{line.productTitle}</span>
            <p className="right">GLRPoints: {line.glrpoints}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderListItems()}</div>;
  }
}

function mapStateToProps(state) {
  return { lineItems: state.lineItems, auth: state.auth };
}

export default connect(
  mapStateToProps,
  { fetchLineItems, fetchUser }
)(LineItemsList);

