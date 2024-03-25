// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg4WUP42FH4lNdJ2gyj4KpATP5G08qu6o",
  authDomain: "netflix-gpt-157d3.firebaseapp.com",
  projectId: "netflix-gpt-157d3",
  storageBucket: "netflix-gpt-157d3.appspot.com",
  messagingSenderId: "1016342068115",
  appId: "1:1016342068115:web:32d8b5f5d279b84ff18666",
  measurementId: "G-F3LG71350R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();