// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBAE_API_KEY,
  authDomain: "linkedin-storage-app.firebaseapp.com",
  projectId: "linkedin-storage-app",
  storageBucket: "linkedin-storage-app.appspot.com",
  messagingSenderId: "369849348948",
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { storage };
