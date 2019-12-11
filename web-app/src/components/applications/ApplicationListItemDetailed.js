import React from 'react'
import moment from "moment";
import {Link} from "react-router-dom";

const ApplicationsListItemDetailed = ({application, profile, program}) => {
    return (
        <Link to={"/application/" + application.id} key={application.id} >
            <div className="container section program-details">
                <div className="card hoverable">
                    <div className="card-content">
                        <span className="card-title">Application for {program.title}</span>

                        <h4>Submission details</h4>
                        <h6>Undergraduate Degree: {application.studentData.undergradDegree}</h6>
                        <h6>GPA: {application.studentData.gpa} GRE: {application.studentData.gre}</h6>
                        <h6>Files submitted: {application.studentData.files}</h6>

                        <Link to={"/program/" + program.id + "/apply"} className="waves-effect waves-light btn deep-purple darken-1">Edit</Link>
                    </div>
                    {/*Footer*/}
                    <div className="card-action grey lighten-4 grey-text">
                        <div>{moment(application.createdAt.toDate()).calendar()}</div>
                        {application.submitDate ? <div>Submitted {moment(application.submitDate.toDate()).calendar()}</div> : null}
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default ApplicationsListItemDetailed
