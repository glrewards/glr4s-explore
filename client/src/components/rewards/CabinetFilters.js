import React, {Component} from "react";
import PropTypes, {func} from "prop-types";
import {Switch, Col, Row} from "react-materialize";

export default class CabinetFilters extends Component {
    render() {
        const roundedContainerStyle = {
            borderRadius: "5px",
            padding: "5px"
        };
        const titleStyle = {
            borderRadius: "5px"
        };
        const switchClass = "right";

        return (
            <Row style={roundedContainerStyle} className={"light-blue lighten-5"}>
                <Col s={12}>
                            <Switch
                                id={"favourite-switch"}
                                className={switchClass}
                                onLabel={"Favourites Only"}
                                offLabel={"All Rewards"}
                                onChange={(event) => this.props.onFavSwitchChanged(event)}
                            />
                </Col>
            </Row>
        );
    }
}
CabinetFilters.propTypes = {
    favourites: PropTypes.bool.isRequired,
    onFavSwitchChanged: PropTypes.func.isRequired
};
