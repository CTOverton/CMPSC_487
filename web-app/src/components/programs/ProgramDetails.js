import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link, Redirect} from 'react-router-dom'
import moment from 'moment'

const ProgramDetails = (props) => {
    const { program, auth, profile } = props;
    const redirect = <Redirect to='/signin' />;
    const editBtn = auth.isLoaded && profile.isLoaded && (auth.uid ? (profile.token.claims.admin === true ? <Link to={"/program/" + program.id + "/edit"} className="waves-effect waves-light btn deep-purple darken-1">Edit</Link>: null) : null);
    const applyBtn = auth.isLoaded && profile.isLoaded && (auth.uid ? (profile.token.claims.admin === true ? null: <Link to={"/program/" + program.id + "/apply"} className="waves-effect waves-light btn deep-purple darken-1">Apply</Link>) : null);

    if (auth.uid) {
        return auth.isLoaded && profile.isLoaded && (program ? (
            <div className="container section program-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{program.title}</span>
                        <p>{program.description}</p>


                        <h4>Courses</h4>

                        <ul className="courses-list collection">
                            {program.courses && program.courses.map(course => {
                                return (
                                    <li className="collection-item" key={course}>{course}</li>
                                )
                            })}
                        </ul>

                        <h4>Additional Requirements</h4>

                        <h6>GPA</h6>
                        <p>Minimum - {program.gpa}</p>

                        <h6>GRE</h6>
                        <p>Minimum - {program.gre}</p>


                        {editBtn}
                        {applyBtn}
                    {/*    //Todo show submitted application*/}
                    </div>
                    {/*Footer*/}
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {program.authorFirstName} {program.authorLastName}</div>
                        <div>{moment(program.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="container center">
                <p>Loading program...</p>
            </div>
        ))
    } else {
        return auth.isLoaded && profile.isLoaded && redirect
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const programs = state.firestore.data.programs;
    const program = programs ? programs[id] : null;
    return {
        program: {...program, id: id},
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{
        collection: 'programs'
    }])
)(ProgramDetails)
