import React from 'react'
import { Row, Col, Collection } from 'react-materialize';
import UserListItem from "./UserListItem";

const UsersList = ({users}) => {

    return (
        <Collection header="Users">
            { users && users.map(user => {
                return <UserListItem user={user} key={user.id}/>
            })}
        </Collection>
    )
}

export default UsersList
