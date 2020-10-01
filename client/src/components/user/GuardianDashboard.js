import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Card, CardTitle, Button, Icon, Row, Col,MediaBox } from "react-materialize";

class GuardianDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>Guardian Dashboard</div>
        )
    }

}
GuardianDashboard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string
};

export default GuardianDashboard;
