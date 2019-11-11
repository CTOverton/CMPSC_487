import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link, Redirect} from 'react-router-dom'
import moment from 'moment'
import ProjectSummary from "../projects/ProjectSummary";

const ProgramDetails = (props) => {
    const { program, auth } = props;
    // if (!auth.uid) return <Redirect to='/signin' />
    if (program) {
        return (
            <div className="container section program-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{program.title}</span>
                        <p>{program.description}</p>
                    </div>

                    <h4>Courses</h4>

                    <ul className="courses-list collection">
                        { program.courses && program.courses.map(course => {
                            return (
                                <li className="collection-item" key={course}>{course}</li>
                            )
                        })}
                    </ul>


                    <h4>Blacklisted IDs</h4>

                    <ul className="blacklistIDs-list collection">
                        { program.blacklistIDs && program.blacklistIDs.map(id => {
                            return (
                                <li className="collection-item" key={id}>{id}</li>
                            )
                        })}
                    </ul>

                    <div className="right">Something</div>

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
    // console.log(state);
    const id = ownProps.match.params.id;
    const programs = state.firestore.data.programs;
    const program = programs ? programs[id] : null
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
