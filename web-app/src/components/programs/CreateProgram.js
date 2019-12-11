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
        gpa: null,
        gre: null,
        files: []
    }

    handleChange = (e) => {
        if (e.target.id === "courses" || e.target.id === "blacklistIDs" || e.target.id === "files") {
            let list = e.target.value.split(',');
            list.forEach((item, index) => {
                list[index] = item.trim();
            });
            this.setState({
                [e.target.id]: list
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProgram(this.state);
        this.props.history.push('/');
    }

    render() {
        const { auth, profile } = this.props;
        const redirect =  <Redirect to='/' />;
        const content =  <div className="container">
            <form className="white">
                <h4 className="grey-text text-darken-3 center">Create a New Program</h4>

                <h5 className="grey-text text-darken-3">Program Details</h5>

                <div className="input-field">
                    <input type="text" id='title' onChange={this.handleChange} />
                    <label htmlFor="title">Program Title</label>
                </div>
                <div className="input-field">
                    <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="description">Program Description</label>
                </div>

                <div className="input-field">
                    <textarea id="courses" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter program courses separated by comma</label>
                </div>

                <h5 className="grey-text text-darken-3">Program Requirements and Moderation</h5>

                <div className="input-field">
                    <textarea id="blacklistIDs" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="blacklistIDs">Enter blacklisted student ID's separated by comma</label>
                </div>

                <div className="input-field">
                    <textarea id="files" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="files">Enter files to submit separated by comma</label>
                </div>

                <div className="input-field">
                    <input type="number" id='gpa' onChange={this.handleChange} />
                    <label htmlFor="gpa">Min GPA Requirement</label>
                </div>

                <div className="input-field">
                    <input type="number" id='gre' onChange={this.handleChange} />
                    <label htmlFor="gre">Min GRE Requirement</label>
                </div>

                <div className="input-field">
                    <button className="waves-effect waves-light btn deep-purple darken-1" onClick={this.handleSubmit}>Create Program</button>
                </div>
            </form>
        </div>;

        // Admin Only
        // return auth.isLoaded && profile.isLoaded && (auth.uid && profile.token.claims.admin === true ? content : redirect);
        return content;

    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createProgram: (program) => dispatch(createProgram(program)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram)
