import OrderListContainer from "../containers-rewards/OrderListContainer";
import {connect} from "react-redux";
import React, {Component} from "react";
import {Container, Row, Col,Section} from "react-materialize";
import PropTypes from "prop-types";
class SuperAdminDashboard extends Component {
    constructor(props) {
        super(props);
    }

    handleOrderListClicked (event){
        console.log("super admin dashboard: " + event.nativeEvent.target.id);
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col s={12}>
               <OrderListContainer orderStatus={'unfulfilled'} orderList={[]} onLineClicked={this.props.onOrderLineClicked}/>
                    </Col>
                </Row>
                <Row>
                    <Col s={12}>
                    <div> stuff goes here</div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
 return {}
}

SuperAdminDashboard.propTypes = {
    orderStatus: PropTypes.string.isRequired,
    orderList: PropTypes.array.isRequired,
    onOrderLineClicked: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(SuperAdminDashboard);
