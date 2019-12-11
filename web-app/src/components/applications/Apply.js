import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {Link, Redirect} from 'react-router-dom'
import ProfileDetails from "../profile/ProfileDetails";
import { Collapsible, CollapsibleItem, Icon, Switch, Checkbox } from 'react-materialize'
import {createProgram} from "../../store/actions/programActions";
import {saveApplication} from "../../store/actions/applicationActions";
import moment from "moment";

class Apply extends Component {
    state = {
        undergradDegree: '',
        gpa: '',
        gre: '',
        sop: '',
        is: true, //Todo add international student and TOEFLScore
        toefl: '',
        documents: []
    }

    handleChange = (e) => {
        let v;
        switch (e.target.id) {
            case "is":
                v = !this.state.is;
                break;
            default:
                v = e.target.value;
        }

        this.setState({
            [e.target.id]: v
        })
    }
    handleSave = (e) => {
        this.props.saveApplication({
            ...this.props.application && {id: this.props.application.id},
            programId: this.props.programId,
            isDraft: true,
            studentData: {...this.state}
        })
    }
    handleSubmit = (e) => {
        console.log(this.state)
        console.log({
            ...this.props.application && {id: this.props.application.id},
            programId: this.props.programId,
            isDraft: false,
            submitDate: new Date(),
            studentData: {...this.state}
        })
    }
    handleDefault = (e) => {
        e.preventDefault();
    }

    render() {
        const { application, auth, profile, program } = this.props;
        const redirect = <Redirect to='/' />;
        const content = <div className="container">
            <form className="white" onSubmit={this.handleDefault}>

                <h3>Application Details</h3>

                <ProfileDetails props={this.props} />

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

                    {program && program.files && program.files.map(file => {
                        return (
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Upload</span>
                                    <input type="file"/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input id={file} className="file-path validate" type="text" placeholder={file}/>
                                </div>
                            </div>
                        )
                    })}


                    {/* Works except clicking on collapsable needs to be disabled somehow*/}
{/*                    <Collapsible accordion={false}>
                        <CollapsibleItem
                            header={<Checkbox id="is" value="Red" label="International Student" checked={this.state.is} onChange={this.handleChange}/>}
                            expanded={this.state.is}>
                            Better safe than sorry. That's my motto.
                        </CollapsibleItem>
                    </Collapsible>*/}

                </div>

                <div className="section">
                    <div className="row">
                        <div onClick={this.handleSave} className="col s12 waves-effect waves-light btn grey lighten-1">Save Draft</div>
                    </div>
                    <div className="row">
                        <div onClick={this.handleSubmit} className="col s12 waves-effect waves-light btn deep-purple darken-1">Submit</div>
                    </div>
                </div>

                { application && application.submitDate &&
                    <div className="date">
                        <p> Date of application submission: {moment(application.submitDate.toDate()).fromNow()}</p>
                    </div>
                }

            </form>
        </div>;

        // Student Only
        return auth.isLoaded && profile.isLoaded && (auth.uid && !(profile.token.claims.admin === true) ? content : redirect);
    }


};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const programs = state.firestore.data.programs;
    const applications = state.firestore.data.applications;
    let application;
    if (applications) {
        for (const [key, value] of Object.entries(applications)) {
            application = value.programId === id ? {...applications[key],id: key} : null;
        }
    } else {
        application = null;
    }

    const program = programs ? programs[id] : null;
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        program: program,
        application: application,
        programId: id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveApplication: (application) => dispatch(saveApplication(application)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'programs'},
        {collection: 'applications'}
        ])
)(Apply)
