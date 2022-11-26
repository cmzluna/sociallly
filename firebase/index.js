import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  onAuthStateChanged as hasAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBEKPJrdyhk11UmDUs6uMjazkV-3URSOtE",
//   authDomain: "socially-2553f.firebaseapp.com",
//   projectId: "socially-2553f",
//   storageBucket: "socially-2553f.appspot.com",
//   messagingSenderId: "820864424214",
//   appId: "1:820864424214:web:b30888db5c74f666e25837",
//   measurementId: "G-MRHWGTLYD0",
// };

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_CLIENT_CONFIG);
console.log("==== usando esta config =====", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const articlesCol = collection(db, "articles");

// Firebase storage
const storage = getStorage();

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

export const onAuthStateChanged = (onChange) => {
  return hasAuthStateChanged(auth, (user) => {
    if (user) {
      const mappedUser = mapUserFromFirebase(user);
      onChange(mappedUser);
    }
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

export const addArticle = ({ avatar, content, userId, userName, img }) =>
  addDoc(articlesCol, {
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });

const mapArticleFromFirebase = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt = "" } = data;
  const newDate = createdAt.toDate();

  return {
    ...data,
    id,
    createdAt: +newDate,
  };
};
export const listenLatestArticles = (callback) => {
  const articlesQuery = query(articlesCol, orderBy("createdAt", "desc"));

  return onSnapshot(articlesQuery, ({ docs }) => {
    const mappedArticles = docs.map(mapArticleFromFirebase);

    callback(mappedArticles);
  });
};

export const fetchLatestArticles = async () => {
  const articlesQuery = query(articlesCol, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(articlesQuery);

  return querySnapshot.docs.map((doc) => mapArticleFromFirebase(doc));
};

export const uploadImage = (img) => {
  const imgRef = ref(storage, `images/${img.name}`);

  return uploadBytesResumable(imgRef, img);
};
