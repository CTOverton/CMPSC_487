import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
// import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ProgramList from "../programs/ProgramList";
import ApplicationsList from "../applications/ApplicationsList";
import ApplicationsListItem from "./ApplicationListItem";
import ApplicationDetails from "./ApplicationDetails";
import ApplicationsListItemDetailed from "./ApplicationListItemDetailed";



class MyApplications extends Component {
    render() {
        const { programs, applications, auth, profile } = this.props;
        const redirect = <Redirect to='/signin' />;
        const content = <div className="container">
            <div className="row">
                <h4 className="grey-text">My Applications</h4>
                { applications && applications.map(application => {
                    if (profile.applications && profile.applications.includes(application.id)) {

                        const program = programs.find(program => program.id === application.programId)
                        return (
                            <ApplicationsListItemDetailed application={application} profile={profile} program={program}/>
                        )
                    }
                })}
            </div>
        </div>;

        return auth.isLoaded && profile.isLoaded && (auth.uid ? content : redirect);

    }
}

const mapStateToProps = (state) => {
    return {
        programs: state.firestore.ordered.programs,
        applications: state.firestore.ordered.applications,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'programs', orderBy: ['createdAt', 'desc']},
        { collection: 'applications', orderBy: ['createdAt', 'desc']},
    ])
)(MyApplications)
