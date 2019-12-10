import React, { Component } from 'react'
import {CollectionItem, Button,Icon,Row} from 'react-materialize'
import {connect} from "react-redux";
import {deleteDepartment} from "../../store/actions/staffActions";

class DepartmentListItem extends Component {

    render() {
        const {department} = this.props;
        return (
            <CollectionItem>
                <Row>
                    {department.name}
                    <Button className="secondary-content red lighten-1" waves="light" onClick={() => this.props.deleteDepartment(department.id)}><Icon>delete</Icon></Button>
                </Row>
            </CollectionItem>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDepartment: (departmentId) => dispatch(deleteDepartment(departmentId))
    }
}

export default connect(null, mapDispatchToProps)(DepartmentListItem)
