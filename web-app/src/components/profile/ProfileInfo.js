import React from 'react'


const ProfileInfo = (props) => {
    const {auth, profile} = props.props;

    return (
        <div>
            <h3 className="grey-text text-darken-3">{profile.firstName} {profile.lastName}</h3>
            <h6 className="grey-text text-darken-3">{auth.email}</h6>
        </div>
    );
};

export default ProfileInfo