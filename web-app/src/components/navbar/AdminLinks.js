import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Admin Home</NavLink></li>
            <li><NavLink to='/'>Log out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>CO</NavLink></li>
        </ul>
    )
}

export default AdminLinks