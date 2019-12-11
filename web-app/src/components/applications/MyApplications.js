import React, { Component } from 'react'
import ProgramList from "../programs/ProgramList";
import ApplicationsList from "./ApplicationsList";
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {Row, Col} from 'react-materialize';


class MyApplications extends Component{


    render() {

        const redirect = <Redirect to='/myapplications' />;
        const {programs, applications, auth, profile} = this.props;
        const content = <div className="container">
            <Row>
                <Col s={12} m={6}>
                    <h4 className="grey-text">My Applications</h4>
                    <ApplicationsList applications={applications} profile={profile}/>
                </Col>
            </Row>
        </div>;

       return content;

    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        applications: state.firestore.ordered.applications,
        auth: state.firebase.auth,
        profile: state.firebase.profile
        // notifications: state.firestore.ordered.notifications
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'applications', orderBy: ['createdAt', 'desc']}
    ])
)(MyApplications)
