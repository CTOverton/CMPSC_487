export const saveApplication = (application) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        const data = {
            ...application,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        };

        if (application.id) {
            firestore.collection('applications').doc(application.id).set(data)
                .then(() => {
                    dispatch({ type: 'CREATE_APPLICATION_SUCCESS' });
                }).catch(err => {
                    dispatch({ type: 'CREATE_APPLICATION_ERROR' }, err);
            });
        } else {
            firestore.collection('applications').add(data)
                .then(() => {
                    dispatch({ type: 'CREATE_APPLICATION_SUCCESS' });
                }).catch(err => {
                    dispatch({ type: 'CREATE_APPLICATION_ERROR' }, err);
            });
        }


    }
}