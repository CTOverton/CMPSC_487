export const addDepartment = (department) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;

        firestore.collection('departments').add({
            name: department,
            authorId: authorId,
            createdAt: new Date()
        })
            .then(result => {
                dispatch({ type: 'CREATE_DEPARTMENT_SUCCESS', result });
            })
            .catch(err => {
                dispatch({ type: 'CREATE_DEPARTMENT_ERROR', err });
        });
    }
}

export const deleteDepartment = (departmentId) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('departments').doc(departmentId).delete()
            .then(result => {
                dispatch({ type: 'DELETE_DEPARTMENT_SUCCESS', result });
            })
            .catch(err => {
                dispatch({ type: 'DELETE_DEPARTMENT_ERROR', err });
            });
    }
}