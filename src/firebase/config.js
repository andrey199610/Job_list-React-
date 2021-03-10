import app from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDF8zQvrtQXtA0j9d3srLDyuSHc3BLpQSU",
  authDomain: "jobsearch-d9361.firebaseapp.com",
  projectId: "jobsearch-d9361",
  storageBucket: "jobsearch-d9361.appspot.com",
  messagingSenderId: "217806384693",
  appId: "1:217806384693:web:04adb751a72c3e79ad4b7c",
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
export { firebase, firestore, app };
