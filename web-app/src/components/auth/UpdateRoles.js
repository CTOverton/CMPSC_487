import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateRoles } from '../../store/actions/authActions'
import {NavLink, Redirect} from 'react-router-dom'

class UpdateRoles extends Component {
    state = {
        email: '',
        role: 'admin',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.signIn(this.state)

        this.props.updateRoles(this.state);
    }
    render() {
        const { authError, auth, profile } = this.props;
        const redirect =  <Redirect to='/' />;
        const content =  <div className="container">
            <form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Update Roles</h5>
                <div className="input-field">
                    <label htmlFor="email">Email of user to update</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                {/*                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>*/}
                <div className="input-field">
                    <button className="waves-effect waves-light btn deep-purple darken-1">Update</button>
                    <div className="center red-text">
                        { authError ? <p>{authError}</p> : <p></p> }
                    </div>
                </div>
            </form>
        </div>;

        // Admin Only
        return auth.isLoaded && profile.isLoaded && (auth.uid && profile.token.claims.admin === true ? content : redirect);
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoles: (user) => dispatch(updateRoles(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoles)
