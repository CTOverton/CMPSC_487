import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link, NavLink, Redirect} from 'react-router-dom'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import UsersList from "./UsersList";
import {Row, Col} from "react-materialize";
import DepartmentList from "./DepartmentList";

class ManageUsers extends Component {
    render() {
        const { auth, profile, users } = this.props;
        const redirect =  <Redirect to='/' />;
        const content =
            <div className="container">
                <Row>
                    <Col s={12} m={6}>
                        <UsersList users={users}/>
                    </Col>
                    <Col s={12} m={6}>
                        <DepartmentList/>
                    </Col>

                </Row>

            </div>;

        // Admin Only
        return auth.isLoaded && profile.isLoaded && (auth.uid && profile.token.claims.admin === true ? content : redirect);
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users'},
    ])
)(ManageUsers)
