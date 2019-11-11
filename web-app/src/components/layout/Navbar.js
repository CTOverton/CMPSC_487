import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import AdminLinks from "./AdminLinks";

const Navbar = (props) => {
  const { auth, profile } = props;
  const { admin } = profile;
  const links = auth.uid ? (admin ? <AdminLinks profile={profile}/>: <SignedInLinks profile={profile} />) : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Web App</Link>
        {auth.isLoaded && links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
