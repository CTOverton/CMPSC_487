export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
        email: newUser.email
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

export const createUser = (user, customClaims) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const createUser = firebase.functions().httpsCallable('createUser');
    createUser({userRecord: user, claims: customClaims})
        .then(result => {
          dispatch({ type: 'CREATEUSER_SUCCESS', result });
        }).catch(err => {
          dispatch({ type: 'CREATEUSER_ERROR', err });
    })
  }
}

export const deleteUser = (uid) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const deleteUser = firebase.functions().httpsCallable('deleteUser');

    firestore.collection('users').doc(uid).delete()
        .then(() => {
      console.log("Document successfully deleted!");
    }).catch(err => {
      console.error("Error removing document: ", err);
    });

    firestore.collection("applications").where("authorId", "==", uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            firestore.collection("applications").doc(doc.id).delete();
          });
        })
        .catch(err => {
          console.log("Error getting documents: ", err);
        });

    deleteUser({uid: uid})
        .then(result => {
          dispatch({ type: 'DELETEUSER_SUCCESS', result });
        }).catch(err => {
          dispatch({ type: 'DELETEUSER_ERROR', err });
    })
  }
}

export const setClaims = (uid, claims) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const setCustomClaims = firebase.functions().httpsCallable('setCustomClaims');
    setCustomClaims({
      uid: uid,
      claims: claims
    })
        .then(result => {
          firestore.collection('users').doc(uid).update({
            claims: claims
          })
          dispatch({ type: 'SETCLAIMS_SUCCESS', result });
        }).catch(err => {
          dispatch({ type: 'SETCLAIMS_ERROR', err });
    })
  }
}

export const setDepartment = (uid, department) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).set({
      department: department
    }, { merge: true })
        .then(result => {
          dispatch({ type: 'DEPARTMENT_UPDATE_SUCCESS', result });
        }).catch(err => {
          dispatch({ type: 'DEPARTMENT_UPDATE_ERROR', err });
    })
  }
}