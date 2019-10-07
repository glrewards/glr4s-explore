import React from "react";
import { Link } from "react-router-dom";
import {SideNav, SideNavItem, Row, Col, Button, Icon,Table, Modal} from "react-materialize";
import EmailNew from "../email/EmailNew";


const AdminDashboard = () => {
  return (


      <Row>
        <Col s={12} m={4} l={2} className=" light-blue darken-2">
          <ul>
            <li>
              <Link
                  className="white-text text-darken-2"
                  to={"/students/school"}
              >
                <h5>XOD Students</h5>
              </Link>
            </li>
          </ul>
          <Button className="col s12 amber darken-4" disabled node="a" style={{margin:3}}>
            Buy Points
          </Button>
          <Button tooltip="Open the reports area"
                  tooltipOptions={{position: 'right'}}
                  className=" col s12 amber darken-4 waves-effect"
                  node="a" style={{margin:3}}>
            View Reports
            <Icon right>
              trending_up
            </Icon>
          </Button>
          <Button  tooltip="View previous school orders"
                   tooltipOptions={{position: 'right'}}
                   className=" col s12 amber darken-4 waves-effect" node="a" style={{margin:3}}>
            Order History
          </Button>
          <Button  tooltip="View the existing order in detail"
                   tooltipOptions={{position: 'right'}}
                   className="col s12 amber darken-4 waves-effect" node="a" style={{margin:3}}>
            Current Basket
            <Icon right>
              shopping_basket
            </Icon>
          </Button>
          <Button  tooltip="Send us an email"
                   tooltipOptions={{position: 'right'}}
                   href="#modal1" className="col s12 modal-trigger amber darken-4 waves-effect" style={{margin:3}}>
            Contact GLR...
            <Icon right>
              email
            </Icon>
          </Button>
        </Col>
      <Col s={12} m={8} l={10} className="light-blue lighten-4">


        <Row>
          <Col s={1}>
            <p>School Logo
            dsfds
            sdfsdf
            sdfdsf
            sdfsdfs
            </p>
          </Col>
          <Col s={12} m={8} l={9} classNmae={"white"}>
            <Table style={{border:'1px solid orange'}} striped={true}>
              <thead>
              <tr>
                <th data-field="mis-total">
                  Total MIS Points
                </th>
                <th data-field="points-factor">
                  Points Factor
                </th>
                <th data-field="total-points-purchased">
                  Total Points Purchased
                </th>
                <th data-field="total-points-spent">
                  Total Points Spent
                </th>
                <th data-field="total-spend">
                  Total Spend £
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>200000</td>
                <td>0.01</td>

                <td>
                  20000
                </td>
                <td>
                  1234
                </td>
                <td>
                  2000.00
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
          <Row>
          <Col s={12}>
            <h5 className="center-align">Current Order Summary</h5>
            <Table style={{border:'1px solid orange'}} striped={true}>
              <thead>
              <tr>
                <th data-field="id">
                  Name
                </th>
                <th data-field="name">
                  Item Name
                </th>
                <th data-field="price">
                  Item Price
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>
                  Alvin
                </td>
                <td>
                  Eclair
                </td>
                <td>
                  $0.87
                </td>
              </tr>
              <tr>
                <td>
                  Alan
                </td>
                <td>
                  Jellybean
                </td>
                <td>
                  $3.76
                </td>
              </tr>
              <tr>
                <td>
                  Jonathan
                </td>
                <td>
                  Lollipop
                </td>
                <td>
                  $7.00
                </td>
              </tr>
              </tbody>
            </Table>
          </Col>
          </Row>
        </Row>

      </Col>

        <Modal id="modal1" header="Send Email to GLR">
          <EmailNew />
        </Modal>
      </Row>
  );
};

export default AdminDashboard;
