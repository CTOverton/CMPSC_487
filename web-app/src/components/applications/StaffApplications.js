import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
// import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ApplicationsListItemDetailed from "./ApplicationListItemDetailed";
import StaffApplicationsListItem from "./StaffApplicationsListItem";



class StaffApplications extends Component {
    render() {
        const { programs, applications, auth, profile } = this.props;
        const redirect = <Redirect to='/signin' />;
        const content = <div className="section">
                { applications && programs && applications.map(application => {
                    const program = programs.find(program => program.id === application.programId)
                    if (program && program.department && program.department === profile.department && !application.isDraft) {
                        return (
                            <StaffApplicationsListItem application={application} profile={profile} program={program}/>
                        )
                    }
                })}
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
)(StaffApplications)
