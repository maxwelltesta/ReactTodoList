import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBws2dAL1BtszeEVRSzNLK7TUrEyqXGJeI",
    authDomain: "todo-rrf-matesta.firebaseapp.com",
    databaseURL: "https://todo-rrf-matesta.firebaseio.com",
    projectId: "todo-rrf-matesta",
    storageBucket: "todo-rrf-matesta.appspot.com",
    messagingSenderId: "1020371136348",
    appId: "1:1020371136348:web:378e15a528c0df788a9b99",
    measurementId: "G-N6TCJTP366" };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;