import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateRoles } from '../../store/actions/authActions'
import {Link, NavLink, Redirect} from 'react-router-dom'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import UsersList from "./UsersList";

class ManageUsers extends Component {
    state = {
        email: ''
    }
    handleChange = (e) => {
        if (e.target.id === 'makeStudent') {
            // this.props.updateRoles(this.state);
            // console.log(e.target.dataset);
            this.props.updateRoles({
                email: e.target.dataset.email,
                role: 'student'
            });
        }
        if (e.target.id === 'makeAdmin') {
                this.props.updateRoles({
                    email: e.target.dataset.email,
                    role: 'admin'
                });

        }

        if (e.target.id === 'makeStaff') {
            this.props.updateRoles({
                email: e.target.dataset.email,
                role: 'staff'
            });
        }


        this.setState({
            [e.target.id]: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.signIn(this.state)

        this.props.updateRoles(this.state);
    }
    render() {
        const { authError, auth, profile, users } = this.props;
        const redirect =  <Redirect to='/' />;
        const content =  <div className="container">

            <UsersList users={users}/>

            {/*<ul className="collection with-header">
                <li className="collection-header"><h4>First Names</h4></li>

                { users && users.map(user => {
                    return (
                        <li className="collection-item" key={user.id}>
                            <div> {user.firstName} {user.lastName} {user.email}
                                <div className="secondary-content">
                                    <div id="makeStudent" className="waves-effect waves-light btn grey lighten-1"
                                         onClick={this.handleChange}
                                         data-email={user.email}
                                         data-fname={user.firstName}
                                         data-lname={user.lastName}
                                         data-id={user.id}
                                    >Make Student</div>


                                    <div id="makeAdmin" className="waves-effect waves-light btn deep-purple darken-1"
                                         onClick={this.handleChange}
                                         data-email={user.email}
                                         data-fname={user.firstName}
                                         data-lname={user.lastName}
                                         data-id={user.id}
                                    >Make Admin</div>

                                    <div className="switch">
                                        <label>
                                            Student
                                            <input type="checkbox" id='role' onClick={this.handleChange}
                                                   data-email={user.email}
                                                   data-fname={user.firstName}
                                                   data-lname={user.lastName}
                                                   data-id={user.id}
                                            />
                                            <span className="lever"></span>
                                            Admin
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </li>
                    )
                })}
            </ul>*/}


            {/*<form className="white" onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Update Roles</h5>
                <div className="input-field">
                    <label htmlFor="email">Email of user to update</label>
                    <input type="email" id='email' onChange={this.handleChange} />
                </div>
                                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={this.handleChange} />
                    </div>
                <div className="input-field">
                    <button className="waves-effect waves-light btn deep-purple darken-1">Update</button>
                    <div className="center red-text">
                        { authError ? <p>{authError}</p> : <p></p> }
                    </div>
                </div>
            </form>*/}
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
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRoles: (user) => dispatch(updateRoles(user))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users'},
    ])
)(ManageUsers)
