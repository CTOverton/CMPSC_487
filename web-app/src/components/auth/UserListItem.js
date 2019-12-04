import React, { Component } from 'react'
import { CollectionItem, Button, Row, Col, Modal, Dropdown, TextInput } from 'react-materialize'
import {deleteUser, updateRoles} from "../../store/actions/authActions";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

class UserListItem extends Component {
    state = {
        role: '',
        department: ''
    };

    changeRole = (e) => {
        this.setState({
            role: e.target.id
        })
    };

    changeDepartment = (e) => {
        this.setState({
            department: e.target.id
        })
    };

    render() {
        const user = this.props.user;
        return (
            <CollectionItem>
                <Row>
                    <Col s={12} m={6}>
                        <h5>{user.firstName}, {user.lastName}</h5>
                        <div>{user.email}</div>
                    </Col>
                    <Col s={12} m={6}>
                        <div className="secondary-content">
                            <Dropdown
                                options={{
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    container: null,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                }}
                                trigger={<Button node="button">{(this.state.role === '')? "Edit Role": "Role: " + this.state.role}</Button>}
                            >
                                <a id="student" onClick={this.changeRole}>
                                    Student
                                </a>
                                <a id="staff" onClick={this.changeRole}>
                                    Staff
                                </a>
                                <a id="admin" onClick={this.changeRole}>
                                    Admin
                                </a>
                            </Dropdown>
                            {(this.state.role === 'staff') ?
                                <Dropdown
                                    options={{
                                        alignment: 'left',
                                        autoTrigger: true,
                                        closeOnClick: true,
                                        constrainWidth: true,
                                        container: null,
                                        coverTrigger: true,
                                        hover: false,
                                        inDuration: 150,
                                        onCloseEnd: null,
                                        onCloseStart: null,
                                        onOpenEnd: null,
                                        onOpenStart: null,
                                        outDuration: 250
                                    }}
                                    trigger={<Button node="button">{(this.state.department === '')? "Edit Department": "Department: " + this.state.department}</Button>}
                                >
                                    <a id="Department1" onClick={this.changeDepartment}>
                                        Department1
                                    </a>
                                    <a id="Department2" onClick={this.changeDepartment}>
                                        Department2
                                    </a>
                                    <a id="Department3" onClick={this.changeDepartment}>
                                        Department3
                                    </a>
                                </Dropdown>
                                : null}
                            <Button
                                node="button"
                                style={{
                                    marginRight: '5px',
                                }}
                                waves="light"
                                className="red lighten-1"
                                onClick={() => this.props.deleteUser(user.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Col>
                </Row>
            </CollectionItem>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoles: (user) => dispatch(updateRoles(user)),
        deleteUser: (uid) => dispatch(deleteUser(uid))
    }
}

export default connect(null, mapDispatchToProps)(UserListItem)
