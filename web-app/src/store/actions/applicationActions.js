export const saveApplication = (application, program) => {
    return (dispatch, getState, {getFirestore}) => {
        if (parseFloat(application.studentData.gpa) < parseFloat(program.gpa)) {
            dispatch({ type: 'CREATE_APPLICATION_ERROR', err: {message: 'A minimum GPA of ' + program.gpa + ' is required'} });
        } else if (parseFloat(application.studentData.gre) < parseFloat(program.gre)) {
            dispatch({ type: 'CREATE_APPLICATION_ERROR', err: {message: 'A minimum GRE of ' + program.gre + ' is required'} });
        } else {
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
                    .then((doc) => {
                        firestore.collection('users').doc(authorId).set({
                            applications: profile.applications ? [...profile.applications, doc.id] : [doc.id]
                        }, { merge: true })
                            .then(() => {
                                dispatch({ type: 'ADD_APPLICATION_TO_USER_SUCCESS' });
                            }).catch(err => {
                            dispatch({ type: 'ADD_APPLICATION_TO_USER_ERROR' }, err);
                        });

                        dispatch({ type: 'CREATE_APPLICATION_SUCCESS' });
                    }).catch(err => {
                    dispatch({ type: 'CREATE_APPLICATION_ERROR' }, err);
                });
            }
        }
    }
}