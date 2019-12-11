import React from 'react'
import ProgramSummary from './ProgramSummary'
import { Link } from 'react-router-dom'

const ProgramList = ({programs}) => {
    return (
        <div className="program-list section">
        { programs && programs.map(program => {
            return (
                <div className="card-panel hoverable">
                    <Link to={'/program/' + program.id} key={program.id}>
                        <ProgramSummary program={program} />
                    </Link>
                </div>

            )
        })}
        </div>
    )
}

export default ProgramList
