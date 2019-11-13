import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { createProgram } from '../../store/actions/programActions'
import { Redirect } from 'react-router-dom'


class StudentApplicationInfo extends Component {
    state = {
        title: '',
        name: '', // title
        studentid: '', //description
        appProgram: '',
        gpa: '',
        greScore: '',
        TOEFLScore: '',
        statementOfpurpose: '',
        courses: [],

    }

    handleChange = (e) => {
        if (e.target.id === "courses") {
            let list = e.target.value.split(',');
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
        // console.log(this.state);
        this.props.createProgram(this.state);
        this.props.history.push('/');
    }



    render() {



        return (
            <div className="container">
                <form className="white">


                <h5 className="grey-text text-darken-3">Student Application Info</h5>
                <div className="input-field">
                    <input type="text" id='title' onChange={this.handleChange} />
                    <label htmlFor="title">Student Info</label>
                </div>
                {/*<div className="input-field">*/}
                {/*    <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>*/}
                {/*    <label htmlFor="description">Program Description</label>*/}
                {/*</div>*/}

                <h6 className="grey-text text-darken-3">Name</h6>

                <div className="input-field">
                    <textarea id="name" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="name">Enter your name</label>
                </div>

                <h6 className="grey-text text-darken-3">Student ID</h6>

                <div className="input-field">
                    <textarea id="studentid" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter your student ID</label>
                </div>

                <h6 className="grey-text text-darken-3">Program</h6>

                <div className="input-field">
                    <textarea id="appProgram" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter the program your wish to apply to</label>
                </div>

                <h6 className="grey-text text-darken-3">GPA</h6>

                <div className="input-field">
                    <textarea id="gpa" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter your your undergraduate GPA</label>
                </div>

                <h6 className="grey-text text-darken-3">Completed Courses</h6>

                <div className="input-field">
                    <textarea id="courses" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter courses you have taken separated by comma</label>
                </div>

                <h6 className="grey-text text-darken-3">GRE</h6>

                <div className="input-field">
                    <textarea id="greScore" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter your GRE Score</label>
                </div>

                <h6 className="grey-text text-darken-3">TOEFL Score</h6>

                <div className="input-field">
                    <textarea id="TOEFELScore" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Enter your TOEFL score if applicable</label>
                </div>

                <h6 className="grey-text text-darken-3">Statement of Purpose</h6>

                <div className="input-field">
                    <textarea id="statementOfpurpose" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    <label htmlFor="courses">Copy in your statement of purpose</label>
                </div>




                <div className="input-field">
                    <button className="waves-effect waves-light btn deep-purple darken-1" onClick={this.handleSubmit}>Submit Information</button>
                </div>
            </form>
            </div>
        )



        // Admin Only
        // return auth.isLoaded && profile.isLoaded && (auth.uid && profile.token.claims.admin === true ? content : redirect);

    }
}

// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth,
//         profile: state.firebase.profile,
//     }
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         createProgram: (program) => dispatch(createProgram(program)),
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(StudentApplicationInfo)
// export default class StudentApplicationInfo {
// }

export default StudentApplicationInfo;