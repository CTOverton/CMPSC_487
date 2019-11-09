import React from 'react'
import { Link } from 'react-router-dom'

import StudentLinks from "./StudentLinks";
import DefaultLinks from "./DefaultLinks";
import AdminLinks from "./AdminLinks";

const Navbar = () => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <Link to='/' className="brand-logo">Web App</Link>
            <div className="container">
                <AdminLinks/>
                <StudentLinks/>
                <DefaultLinks/>
            </div>
        </nav>
    )
}

export default Navbar