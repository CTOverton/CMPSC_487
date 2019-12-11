import React from 'react'
import ApplicationsListItem from "./ApplicationListItem";

const ApplicationsList = ({applications, profile, programs}) => {
    return (
        <div className="application-list section">
            { applications && applications.map(application => {
                if (profile.applications && profile.applications.includes(application.id)) {

                    const program = programs.find(program => program.id === application.programId)
                    return (
                        <ApplicationsListItem application={application} program={program} profile={profile}/>
                    )
                }
            })}
        </div>
    )
}

export default ApplicationsList
