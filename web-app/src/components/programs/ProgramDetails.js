import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProgramDetails = (props) => {
    const { program, auth } = props;
    if (!auth.uid) return <Redirect to='/signin' />;
    if (program) {
        return (
            <div className="container section program-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{program.title}</span>
                        <p>{program.content}</p>s
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {program.authorFirstName} {program.authorLastName}</div>
                        <div>{moment(program.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading program...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const programs = state.firestore.data.programs;
    const program = program ? program[id] : null;
    return {
        program: program,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'programs'
    }])
)(ProgramDetails)
