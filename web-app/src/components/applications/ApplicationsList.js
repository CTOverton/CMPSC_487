import React from 'react'
import moment from "moment";

const ApplicationsList = ({applications, profile}) => {
    return (
        <div className="application-list section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <ul>
                        { applications && applications.map(application => {
                            if (profile.applications && profile.applications.includes(application.id)) {
                                return (
                                    <li key={application.id}>
                                        <span>{application.id}</span>
                                        <div className="application-date grey-text">{moment(application.createdAt.toDate()).fromNow()}</div>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ApplicationsList
