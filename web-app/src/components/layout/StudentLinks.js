import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const StudentLinks = (props) => {
    return (
        <div>
            <ul className="right">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><a onClick={props.signOut}>Log Out</a></li>
                <li><NavLink to='/' className="btn btn-floating deep-purple darken-1">
                    {props.profile.initials}
                </NavLink></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(StudentLinks)