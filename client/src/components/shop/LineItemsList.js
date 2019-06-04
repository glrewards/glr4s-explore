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
        <div key={line._id} className="card lime darken-1 ">
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

/*
 <div>
        <ul className="collection">
          <li className="collection-item avatar">
            <img src="images/yuna.jpg" alt="" className="circle" />
            <span className="title">Title</span>
            <p>First Line Second Line</p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle">folder</i>
            <span className="title">Title</span>
            <p>First Line Second Line</p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle green">insert_chart</i>
            <span className="title">Title</span>
            <p>First Line Second Line</p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
          <li className="collection-item avatar">
            <i className="material-icons circle red">play_arrow</i>
            <span className="title">Title</span>
            <p>First Line Second Line</p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
        </ul>
      </div>
 */
