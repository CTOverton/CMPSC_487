import React, { Component } from 'react'
import { CollectionItem, Button, Row, Col, Modal, Dropdown, TextInput } from 'react-materialize'
import {deleteUser, setClaims, setDepartment} from "../../store/actions/authActions";
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

class UserListItem extends Component {
    state = {
        role: this.props.user.claims ? Object.keys(this.props.user.claims)[0] : '',
        department: this.props.user.department ? this.props.user.department : ''
    };

    changeRole = (e) => {
        this.setState({
            role: e.target.id
        });

        this.props.setClaims(this.props.user.id,{
            [e.target.id]: true
        })

    };

    changeDepartment = (e) => {
        this.setState({
            department: e.target.id
        })

        this.props.setDepartment(this.props.user.id,e.target.id)
    };

    render() {
        const {departments, user} = this.props;
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

                                    { departments && departments.map(department => {
                                        return (
                                            <a id={department.name} key={department.id} onClick={this.changeDepartment}>
                                                {department.name}
                                            </a>
                                        )
                                    })}
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

const mapStateToProps = (state) => {
    return{
        departments: state.firestore.ordered.departments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (uid) => dispatch(deleteUser(uid)),
        setClaims: (uid, claims) => dispatch(setClaims(uid, claims)),
        setDepartment: (uid, department) => dispatch(setDepartment(uid, department))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'departments'},
    ])
)(UserListItem)