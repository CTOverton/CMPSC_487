import React from 'react'
import { NavLink } from 'react-router-dom'
import {NavItem} from "react-materialize";

const SignedOutLinks = () => {
  return (
    <div>
      <ul>
          <li><NavItem><NavLink to='/signup'>Signup</NavLink></NavItem></li>
          <li><NavItem><NavLink to='/signin'>Login</NavLink></NavItem></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks