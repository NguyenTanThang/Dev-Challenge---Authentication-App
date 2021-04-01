import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAooXI-FHvzNuT32FP7csswTJtEGimtEYc",
    authDomain: "dev-challenge-workspace.firebaseapp.com",
    projectId: "dev-challenge-workspace",
    storageBucket: "dev-challenge-workspace.appspot.com",
    messagingSenderId: "629399812067",
    appId: "1:629399812067:web:f73eecb386a81c870892d6",
    measurementId: "G-NKP648TSM4"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}
export const signOut = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
  }
export const createUserWithEmailAndPassword = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
}
export const signInWithEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    console.log(error);
  });
}
export const firebaseStorage = app.storage();
export const firebaseFirestore = app.firestore();