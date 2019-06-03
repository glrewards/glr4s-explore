import React from 'react';
import Studentist from './StudentList';
import {Link} from "react-router-dom";

const StudentDashboard = () => {
    return (
        <div className="row">

            <div className="col s12 m4 l3 blue-grey lighten-1">
                This is a side nav bar
                <ul>
                    <li><Link to={"/shop/myitems"}>My Items</Link></li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                    <li>Item 5</li>
                    <li>Item 6</li>
                    <li>Item 7</li>

                </ul>

            </div>

            <div className="col s12 m8 l9">
                <div>
                    <Studentist/>
                </div>

            </div>

        </div>
    );
}



export default StudentDashboard;
