import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link, Redirect} from 'react-router-dom'

class Apply extends Component {
    state = {
        undergradDegree: '',
        gpa: '',
        gre: '',
        sop: '',
        documents: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSave = (e) => {
        console.log(this.state)
    }
    handleSubmit = (e) => {
        console.log(this.state)
    }
    handleDefault = (e) => {
        e.preventDefault();
    }

    render() {
        const { program, auth, profile } = this.props;
        const redirect = <Redirect to='/' />;
        const content = <div className="container">
            <form className="white" onSubmit={this.handleDefault}>

                <h3>Application Details</h3>

                <div className="section">
                    <div className="input-field">
                        <label htmlFor="undergradDegree">Undergraduate Degree</label>
                        <input type="text" id='undergradDegree' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="gpa">GPA</label>
                        <input type="number" id='gpa' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="gre">GRE</label>
                        <input type="number" id='gre' onChange={this.handleChange} />
                    </div>


                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload</span>
                            <input type="file"/>
                        </div>
                        <div className="file-path-wrapper">
                            <input id="sop" className="file-path validate" type="text" placeholder="Statement of Purpose"/>
                        </div>
                    </div>

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload</span>
                            <input type="file" multiple/>
                        </div>
                        <div className="file-path-wrapper">
                            <input id="documents" className="file-path validate" type="text" placeholder="Documents"/>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="row">
                        <div onClick={this.handleSave} className="col s12 waves-effect waves-light btn grey lighten-1">Save Draft</div>
                    </div>
                    <div className="row">
                        <div onClick={this.handleSubmit} className="col s12 waves-effect waves-light btn deep-purple darken-1">Submit</div>
                    </div>
                </div>

            </form>
        </div>;

        // Student Only TODO: Check if
        return auth.isLoaded && profile.isLoaded && (auth.uid && !(profile.token.claims.admin === true) ? content : redirect);
    }


};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const programs = state.firestore.data.programs;
    const program = programs ? programs[id] : null;
    return {
        program: program,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'programs'}
    ])
)(Apply)
