export const createProgram = (program) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('programs').add({
      ...program,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      department: profile.department ? profile.department : 'NO DEPARTMENT',
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROGRAM_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROGRAM_ERROR' }, err);
    });
  }
};