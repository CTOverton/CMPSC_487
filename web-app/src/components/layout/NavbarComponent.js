import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './StudentLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import AdminLinks from "./AdminLinks";
import { Navbar } from 'react-materialize'
import StaffLinks from "./StaffLinks";

const NavbarComponent = (props) => {
  const { auth, profile } = props;

  // Todo: better way to manage auth
/*  function authorize(data) {
    const {allow, deny, defaultSignedIn, defaultSignedOut} = data;
    if (deny) {
      for (let [key, value] of Object.entries(deny)) {
        if (auth.isLoaded && profile.isLoaded && auth.uid && profile.token.claims[key] === true) {
          return value;
        }
      }
    }

    if (allow) {
      for (let [key, value] of Object.entries(allow)) {
        if (auth.isLoaded && profile.isLoaded && auth.uid && profile.token.claims[key] === true) {
          return value;
        }
      }
    }

    if (auth.isLoaded && profile.isLoaded && auth.uid) {
      return defaultSignedIn ? defaultSignedIn : "Error: No default value set";
    }

    return defaultSignedOut ? defaultSignedOut : "Error: No default value set";
  }

  const content = authorize({
    allow: [
        {admin: <AdminLinks profile={profile}/>},
      {staff: <div>Staff<SignedOutLinks /></div>}
      ],
    defaultSignedIn: <SignedInLinks profile={profile} />,
    defaultSignedOut: <SignedOutLinks />

  })*/

  // const links = auth.isLoaded && profile.isLoaded && content;
  const links = auth.isLoaded && profile.isLoaded &&(
      auth.uid ? (
          profile.token.claims.admin === true ?
              <AdminLinks profile={profile}/> : (
              profile.token.claims.staff === true ?
                  <StaffLinks profile={profile} /> :
                  <SignedInLinks profile={profile} />)) :
          <SignedOutLinks />
          );

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
