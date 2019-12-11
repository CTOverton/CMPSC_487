import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  // TODO: Fix confirm password
  handlePassword = (e) => {
    const { password, confirmPassword } = this.state;
    if (confirmPassword !== password) {
      alert("Passwords don't match");
      e.preventDefault();
    } else {
      // make API call
    }
  }

  render() {
    const { auth, profile, authError } = this.props;
    // if (auth.uid && !profile.admin) return <Redirect to='/' />;

    const redirect = <Redirect to='/' />;
    const content = <div className="container">
      <form className="white" onSubmit={this.handleSubmit}>
        <h5 className="grey-text text-darken-3">Sign Up</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id='email' onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' onChange={this.handleChange} />
        </div>
        <div className="input-field">
          {/* TODO: Fix Password Confirm*/}
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" id='confirmpassword' onChange={this.handleChange} onBlur={this.handlePassword} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id='firstName' onChange={this.handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id='lastName' onChange={this.handleChange} />
        </div>
        <div className="input-field">
          {/* TODO Fix save vs submit*/}
          <button className="waves-effect waves-light btn deep-purple darken-1" onClick={this.handlePassword}>Sign Up</button>
          <div className="center red-text">
            { authError ? <p>{authError}</p> : <p></p> }
          </div>
        </div>
      </form>
    </div>;

    // Show only if logged out
    return auth.isLoaded && profile.isLoaded && (auth.uid ? redirect : content);
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
