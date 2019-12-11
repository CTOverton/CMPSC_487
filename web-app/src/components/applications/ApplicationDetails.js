import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link, Redirect} from 'react-router-dom'
import moment from 'moment'

const ApplicationDetails = (props) => {
    const { application, auth, profile, program } = props;
    const redirect = <Redirect to='/' />;

    if (auth.uid) {
        return auth.isLoaded && profile.isLoaded && (application ? (
            <div className="container section program-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Application for {program.title}</span>

                        <h4>Submission details</h4>
                        <h6>Undergraduate Degree: {application.studentData.undergradDegree}</h6>
                        <h6>GPA: {application.studentData.gpa} GRE: {application.studentData.gre}</h6>
                        <h6>Files submitted: {application.studentData.files}</h6>

                        <Link to={"/program/" + application.programId + "/apply"} className="waves-effect waves-light btn deep-purple darken-1">Edit</Link>
                    </div>
                    {/*Footer*/}
                    <div className="card-action grey lighten-4 grey-text">
                        <div>{moment(application.createdAt.toDate()).calendar()}</div>
                        {application.submitDate ? <div>Submitted {moment(application.submitDate.toDate()).calendar()}</div> : null}
                    </div>
                </div>
            </div>
        ) : (
            <div className="container center">
                <p>Loading application...</p>
            </div>
        ))
    } else {
        return auth.isLoaded && profile.isLoaded && redirect
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const applications = state.firestore.data.applications;
    const application = applications ? applications[id] : null;
    const programs = state.firestore.data.programs;
    const program = programs && application ? programs[application.programId] : null;
    return {
        application: {...application, id: id},
        program: program,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'applications'
    }])
)(ApplicationDetails)
