import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import programReducer from "./programReducer";
import applicationReducer from "./applicationReducer";
import staffReducer from "./staffReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  program: programReducer,
  application: applicationReducer,
  staff: staffReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object