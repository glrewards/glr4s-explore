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
          <ul id="slide-out" class="sidenav sidenav-fixed">
              <li>
                  <Link to={"/categories"}>
                      <h5>Categories</h5>
                  </Link>
              </li>
              <li>
                  <Link to={"/students/all"}>
                      <h5>All Students List</h5>
                  </Link>
              </li>
              <li>
                  <Link to={"/students/school"}>
                      <h5>XOD Students</h5>
                  </Link>
              </li>
          </ul>
          <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    );
  }
}

export default AdminSideNav;
