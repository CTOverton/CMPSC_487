import React from 'react'
import moment from "moment";
import {Link} from "react-router-dom";

const StaffApplicationsListItem = ({application, profile, program}) => {
    return (
        <div className="card hoverable">
            <div className="card-content">
                <span className="card-title">Application for {program.title}</span>

                <h5>Submission details</h5>
                <h6>Student Name: {application.authorFirstName}, {application.authorLastName}</h6>
                <h6>Student id: {application.authorId}</h6>
                <h6>Undergraduate Degree: {application.studentData.undergradDegree}</h6>
                <h6>GPA: {application.studentData.gpa} GRE: {application.studentData.gre}</h6>

                <div className="waves-effect waves-light btn deep-purple darken-1" style={{marginRight: '5px', marginLeft: '5px'}}>Download Files</div>
                <div className="waves-effect waves-light btn blue darken-3" style={{marginRight: '5px', marginLeft: '5px'}}>Approve</div>
                <div className="waves-effect waves-light btn red lighten-1" style={{marginRight: '5px', marginLeft: '5px'}}>Deny</div>
            </div>
            {/*Footer*/}
            <div className="card-action grey lighten-4 grey-text">
                {application.submitDate ? <div>Submitted {moment(application.submitDate.toDate()).calendar()}</div> : null}
            </div>
        </div>
    )
}
export default StaffApplicationsListItem
