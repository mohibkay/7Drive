import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

var app = firebase.initializeApp(config);

const firestore = firebase.firestore();
export const db = firebase.firestore(app);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => ({
    ...doc.data(),
    id: doc.id,
  }),
  getServerTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export default firebase;
