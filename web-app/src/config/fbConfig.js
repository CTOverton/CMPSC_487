import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPgRsl3sNu-blGY5pNiHMI3eRp9EW4fDQ",
    authDomain: "cmpsc-487.firebaseapp.com",
    databaseURL: "https://cmpsc-487.firebaseio.com",
    projectId: "cmpsc-487",
    storageBucket: "cmpsc-487.appspot.com",
    messagingSenderId: "528907711653",
    appId: "1:528907711653:web:941a6ce12a147c2fe5894c",
    measurementId: "G-JLCHK6JZTQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.analytics();

export default firebase;