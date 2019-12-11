import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
// import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ProgramList from "../programs/ProgramList";
import ApplicationsList from "../applications/ApplicationsList";



class Dashboard extends Component {
  render() {
    const { programs, applications, auth, profile } = this.props;
    const redirect = <Redirect to='/signin' />;
    const content = <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <h4 className="grey-text">Graduate Programs</h4>
          <ProgramList programs={programs} />
        </div>
        <div className="col s12 m6">
          <h4 className="grey-text">My Applications</h4>
          <ApplicationsList applications={applications} profile={profile}/>
        </div>
        {/*<div className="col s12 m5 offset-m1">*/}
        {/*  /!*<Notifications notifications={notifications} />*!/*/}
        {/*</div>*/}
      </div>
    </div>;

    return auth.isLoaded && profile.isLoaded && (auth.uid ? content : redirect);

  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    programs: state.firestore.ordered.programs,
    applications: state.firestore.ordered.applications,
    auth: state.firebase.auth,
    profile: state.firebase.profile
    // notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'programs', orderBy: ['createdAt', 'desc']},
    { collection: 'applications', orderBy: ['createdAt', 'desc']},
    // { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
