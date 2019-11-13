import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProgram } from '../../store/actions/programActions'
import { Redirect } from 'react-router-dom'

class CreateProgram extends Component {
    state = {
        title: '',
        description: '',
        courses: [],
        blacklistIDs: [],
    };

    handleChange = (e) => {
        if (e.target.id === "courses" || e.target.id === "blacklistIDs") {
            let list = e.target.value.split(',');
            this.setState({
                [e.target.id]: list
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }

    };
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.createProgram(this.state);
        this.props.history.push('/');
    };

    checkAcces = (allowedRoles, deniedRoles, profile) => {
        // !profile.isEmpty && profile.token.claims[accessRole]
        allowedRoles.map(role =>{
            if (role === 'default') {
                return true;
            }
            if (profile.token && profile.token.claims && profile.token.claims[role]) {
                return true;
            }
        });
        deniedRoles.map(role =>{
            if (role === 'default') {
                return false;
            }
            if (profile.token && profile.token.claims && profile.token.claims[role]) {
                return false;
            }
        });
    };

    render() {
        const { auth, profile } = this.props;
        const redirect =  <Redirect to='/' />;
        const content =  <div className="container">
            <form className="white">
                <h5 className="grey-text text-darken-3">Create a New Program</h5>
                <div className="input-field">
                    <input type="text" id='title' onChange={this.handleChange} />
                    <label htmlFor="title">Program Title</label>
                </div>
                <div className="input-field">
                    <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="description">Program Description</label>
                </div>
                <h6 className="grey-text text-darken-3">Courses</h6>

                <div className="input-field">
                    <textarea id="courses" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter courses separated by comma</label>
                </div>

                <h6 className="grey-text text-darken-3">Blacklisted Students</h6>

                <div className="input-field">
                    <textarea id="blacklistIDs" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="blacklistIDs">Enter student ID's separated by comma</label>
                </div>

                <div className="input-field">
                    <button className="waves-effect waves-light btn deep-purple darken-1" onClick={this.handleSubmit}>Create Program</button>
                </div>
            </form>
        </div>;

        // Admin Only
        return auth.isLoaded && profile.isLoaded && (auth.uid && profile.token.claims.admin === true ? content : redirect);

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createProgram: (program) => dispatch(createProgram(program)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram)
