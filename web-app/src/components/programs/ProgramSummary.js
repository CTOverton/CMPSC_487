import React from 'react'
import moment from 'moment'

const ProgramSummary = ({program}) => {


    return (
        <div className="card z-depth-0 program-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title ">{program.title}</span>
                <p>Posted by {program.authorFirstName} {program.authorLastName}</p>
                <p className="grey-text">{moment(program.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    )

    // return(
    //
    // )
}

export default ProgramSummary
