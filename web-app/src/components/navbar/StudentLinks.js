import React from 'react'
import { NavLink } from 'react-router-dom'

const StudentLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Student Home</NavLink></li>
            <li><NavLink to='/'>Log out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>CO</NavLink></li>
        </ul>
    )
}

export default StudentLinks