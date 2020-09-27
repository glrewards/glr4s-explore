import React, { Component } from "react";
import RewardCard from "../rewards/RewardCard";
import {Row, Col} from "react-materialize";

class RewardContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log("temp");
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("temp");
    }
    render() {
        return(
            <Row >
                <Col s={12} m={6}>
        <RewardCard>Left hand side </RewardCard>
                </Col>
                <Col s={12} m={6}>
                    right hand side
                </Col>
            </Row>
        );
    }

}
export default RewardContainer;
