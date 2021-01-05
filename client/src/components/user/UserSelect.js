import {Col, Collection, CollectionItem, Icon, Row, Select} from "react-materialize";
import React, {Component} from "react";
import PropTypes from "prop-types";
import UserList from "./UserList";
import {blue} from "@material-ui/core/colors";

class UserSelect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        {
            //create the rows
            let items = [];
            for (let i = 0; i < this.props.userList.length; i++) {
                //console.log(this.props.userList[i]);
                items.push(
                    <option value={this.props.userList[i]._id} key={this.props.userList[i]._id}>
                        {this.props.userList[i].firstName + " " + this.props.userList[i].lastName}
                    </option>
                );
            }
            return (
                <div>
                    <Row>
                        <Col s={12}>
                            <Select className={"green"}
                                id="SelectRelated"
                                multiple={false}
                                onChange={(e) => {
                                    this.props.selectUser(e.target.value)}}
                                options={{
                                    classes: '',
                                    dropdownOptions: {
                                        alignment: 'left',
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        coverTrigger: false,
                                        hover: false,
                                        inDuration: 150,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 250
                                    }
                                }}
                            >
                                <option disabled value="" selected={true}>
                                    Related Members
                                </option>
                                {items}
                            </Select>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

UserSelect.propTypes = {
    userList: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    selectUser: PropTypes.func.isRequired
};

export default UserSelect;