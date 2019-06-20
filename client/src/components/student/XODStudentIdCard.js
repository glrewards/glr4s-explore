import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// this displays a simple summary and image of the student based on values mapped into the props taken
// from the redux state
class XODStudentIdCard extends Component {
  constructor(props) {
    super(props);
    this.renderImage = this.renderImage.bind(this);
  }

  renderImage() {
    if (this.props.student) {
      return (
        <img
          className="center-align"
          src={"data:image/png;base64," + this.props.student.Photo}
        />
      );
    } else {
      return <img />;
    }
  }

  render() {
    let imageDvStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      textAlign: "center",
      border: "5px solid orange"
    };
    return (
      <div className="card" style={imageDvStyle}>
        <h5 className="card-title">{this.props.student ? this.props.student.DisplayName : ""}</h5>
        <div className="card-content">
            <div className="card-image">{this.renderImage()}</div>
         <div className="card-action">
             <span><ul>
                 <li><Link to={"/shop/myitems"}>My Items</Link></li>
                 <li><Link>My Classes</Link></li>
         </ul></span>
         </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    student: state.xodSingleStudent,
    auth: state.auth,
    school: state.schoolId
  };
}

export default connect(mapStateToProps)(XODStudentIdCard);
