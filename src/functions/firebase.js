import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

const firebaseConfig = {

    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL
};

firebase.initializeApp(firebaseConfig);

export default firebase;
export const auth = firebase.auth;
export const db = firebase.database().ref();