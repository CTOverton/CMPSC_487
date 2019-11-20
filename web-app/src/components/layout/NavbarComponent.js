import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './StudentLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import AdminLinks from "./AdminLinks";
import { Navbar } from 'react-materialize'

const NavbarComponent = (props) => {
  const { auth, profile } = props;
  const links = auth.isLoaded && profile.isLoaded && (auth.uid ? (profile.token.claims.admin === true ? <AdminLinks profile={profile}/>: <SignedInLinks profile={profile} />) : <SignedOutLinks />);

  // Todo fix this garbage
  return (
      <Navbar className="grey darken-3" brand={<Link to='/' className="brand-logo" style={{paddingLeft: "40px"}}>Admissions System</Link>} alignLinks="right">
        {links}
      </Navbar>
  )
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(NavbarComponent)
