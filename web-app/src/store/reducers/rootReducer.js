import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import programReducer from "./programReducer";
import applicationReducer from "./applicationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  program: programReducer,
  application: applicationReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object