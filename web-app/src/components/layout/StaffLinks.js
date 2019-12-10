import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import {NavItem} from "react-materialize";

const StaffLinks = (props) => {
    return (
        <div>
            <ul>
                <li><NavItem><NavLink to='/'>Home</NavLink></NavItem></li>
                <li><NavItem><NavLink to='/createprogram'>Create Program</NavLink></NavItem></li>
                <li><NavItem onClick={props.signOut}>Log Out</NavItem></li>
                <li><NavItem><NavLink to='/profile' className="btn btn-floating deep-blue darken-1">
                    {props.profile.initials}
                </NavLink></NavItem></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(StaffLinks)
