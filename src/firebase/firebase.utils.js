import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBfiz2l1U0TfFi540K98tiWKWrmj_75RnI",
  authDomain: "andrei-bc5f4.firebaseapp.com",
  databaseURL: "https://andrei-bc5f4.firebaseio.com",
  projectId: "andrei-bc5f4",
  storageBucket: "andrei-bc5f4.appspot.com",
  messagingSenderId: "393542800008",
  appId: "1:393542800008:web:7647dbe19e7eb05007853d",
  measurementId: "G-VPH134TE3T",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
