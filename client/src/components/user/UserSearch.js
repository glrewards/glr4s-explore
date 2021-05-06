import PropTypes from "prop-types";
import React, { Component } from "react";
import {Col, TextInput, Button, Icon, Row} from "react-materialize";

class UserSearch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const buttonClass = "col amber darken-4 right waves-effect waves-purple valign-wrapper";
        const titleStyle = {
            borderRadius: "5px", padding: "10px"
        };
        return (
            <div>
                <Row style={titleStyle}>
                    <Col s={12}>
                        <TextInput id={"fname"} label={"First Name"}/>
                        <TextInput id={"lname"} label={"Last Name"}/>
                        <Button className={buttonClass}
                                         disabled={false}
                                         onClick={() => {this.props.search()}}>Search </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

UserSearch.propTypes = {
    search: PropTypes.func.isRequired
};

export default UserSearch;
