import React, { Component } from "react";
import { Link } from "react-router-dom";


// this displays a simple summary and image of the student based on values mapped into the props taken
// from the redux state
class AdminSideNav extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
          <ul id="slide-out" className="sidenav">
              <li>
                  <Link className="white-text text-darken-2" to={"/categories"}>
                      <h5>Categories</h5>
                  </Link>
              </li>
              <li>
                  <Link className="white-text text-darken-2" to={"/students/all"}>
                      <h5>All Students List</h5>
                  </Link>
              </li>
              <li>
                  <Link className="white-text text-darken-2" to={"/students/school"}>
                      <h5>XOD Students</h5>
                  </Link>
              </li>
          </ul>
      </div>
    );
  }
}

export default AdminSideNav;
