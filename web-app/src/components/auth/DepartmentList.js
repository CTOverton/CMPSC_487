import React, { Component } from 'react'
import {Row, Col, Collection, CollectionItem, TextInput, Button} from 'react-materialize';
import DepartmentListItem from "./DepartmentListItem";
import {connect} from "react-redux";
import {addDepartment} from "../../store/actions/staffActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

class DepartmentList extends Component {
    state = {
        department: null
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const {departments} = this.props;
        return (
            <Collection header="Departments">
                <CollectionItem>
                    <Row>
                        <TextInput id="department" label="Add Department" onChange={this.handleChange}/>
                        <Button
                            node="button"
                            waves="light"
                            onClick={() => {
                                if (this.state.department !== null) {
                                    this.props.addDepartment(this.state.department)
                                }
                            }}
                        >
                            Add
                        </Button>
                    </Row>

                </CollectionItem>
                { departments && departments.map(department => {
                    return <DepartmentListItem department={department} key={department.id}/>
                })}
            </Collection>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        departments: state.firestore.ordered.departments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDepartment: (department) => dispatch(addDepartment(department))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'departments'},
    ])
)(DepartmentList)
