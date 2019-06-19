import React from "react";
import { Link } from "react-router-dom";
import AdminSideNav from "./AdminSideNav";


const AdminDashboard = () => {
  return (
    <div className="row  amber">
      <div className="col s12 m4 l3 grey lighten-1">
        <ul>
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
        <AdminSideNav />
      </div>

      <div className="col s12 m8 l9" />
    </div>
  );
};

export default AdminDashboard;
