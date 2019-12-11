import React from 'react'
import moment from "moment";
import {Link} from "react-router-dom";

const ApplicationsListItem = ({application, profile, program}) => {
    return (
        <Link to={"/application/" + application.id} key={application.id} >
            <div className={"card-panel hoverable"}>
                <span>{program.title}</span>
                <p className="truncate">{program.description}</p>
                <div className="application-date grey-text">Applied {moment(application.createdAt.toDate()).fromNow()}</div>
            </div>
        </Link>
    )
}
export default ApplicationsListItem
