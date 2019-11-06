import React, { Component } from 'react'
import Notifications from "./Notifications";
import ProjectList from "./ProjectsList";
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        // console.log(this.props)
        const { projects } = this.props;

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6"><ProjectList projects={projects}/></div>
                    <div className="col s12 m5 offset-m1"><Notifications/></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.tempProject.projects
    }
}

export default connect(mapStateToProps)(Home)