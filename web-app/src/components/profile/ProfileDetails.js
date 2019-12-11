import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import ProfileInfo from "./ProfileInfo";
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'

class ProfileDetails extends Component {
    state = {
        email: '',
        password: '',
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
    render() {
        const { auth, profile, authError } = this.props;
        // const { details } = profile;
        const details  = [
            {key:'email', value: auth.email, icon: 'email'},
            {key:'firstName', value: profile.firstName, icon: 'face'},
            {key:'lastName', value: profile.lastName, icon: 'face'},
        ];

        const redirect = <Redirect to='/signin' />;
        const content = <div className="container">
            <div className="section">
                <ProfileInfo props={this.props}/>
            </div>
            <div className="section">
                <h5 className="white-text text-darken-3">Profile Details</h5>
                <Collapsible>
                    {details && details.map(detail => {
                        return (
                            <CollapsibleItem header={<div>{detail.value}</div>} icon={<Icon>{detail.icon}</Icon>} key={detail.key}>
                                <div className="input-field">
                                    <label htmlFor={detail.key}>{detail.key}</label>
                                    <input type="text" id={detail.key} />
                                </div>
                                <div className="waves-effect waves-light btn deep-purple darken-1">Update {detail.key}</div>
                            </CollapsibleItem>
                        )
                    })}

                </Collapsible>
            </div>


{/*            <form className="white" onSubmit={this.handleSubmit}>

                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' onChange={this.handleChange} />
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
                    <button className="waves-effect waves-light btn deep-purple darken-1">Sign Up</button>
                    <div className="center red-text">
                        { authError ? <p>{authError}</p> : <p></p> }
                    </div>
                </div>
            </form>*/}
        </div>;

        // Show only if logged in
        return auth.isLoaded && profile.isLoaded && (auth.uid ? content : redirect);
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
        // signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
