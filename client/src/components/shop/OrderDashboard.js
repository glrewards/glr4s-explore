import React from "react";
import LineItemslist from "./LineItemsList";
import Studentist from "../student/StudentList";

const OrderDashboard = () => {
  return (
    <div>
        <h2>Here are your current items on Order</h2>
      <div>
        <LineItemslist />
      </div>
        <div>
            <ul className="pagination blue-grey lighten-1">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
    </div>



  );
};

export default OrderDashboard;
