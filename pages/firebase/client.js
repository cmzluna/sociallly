import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged as hasAuthStateChanged,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEKPJrdyhk11UmDUs6uMjazkV-3URSOtE",
  authDomain: "socially-2553f.firebaseapp.com",
  projectId: "socially-2553f",
  storageBucket: "socially-2553f.appspot.com",
  messagingSenderId: "820864424214",
  appId: "1:820864424214:web:b30888db5c74f666e25837",
  measurementId: "G-MRHWGTLYD0",
};

const app = initializeApp(firebaseConfig);

const mapUserFromFirebase = (user) => {
  const { displayName, email, photoURL, uid, reloadUserInfo } = user;
  const { screenName } = reloadUserInfo;

  return {
    userName: screenName,
    avatar: photoURL,
    name: displayName,
    email,
    userId: uid,
  };
};

const auth = getAuth(app);

export const onAuthStateChanged = (onChange) => {
  return hasAuthStateChanged(auth, (user) => {
    const mappedUser = mapUserFromFirebase(user);
    onChange(mappedUser);
  });
};

export const gitHubLogin = () => {
  // Initialize Firebase Authentication and get a reference to the service

  const provider = new GithubAuthProvider();

  return signInWithPopup(auth, provider).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    // ...

    console.log("ERROR!!! = ", errorCode, errorMessage, email, credential);
  });
};
