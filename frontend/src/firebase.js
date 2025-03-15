// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUVGOYDwT9zPNltMxU1j5FghQJe7u7lZo",
    authDomain: "ipproject-7fefc.firebaseapp.com",
    projectId: "ipproject-7fefc",
    storageBucket: "ipproject-7fefc.firebasestorage.app",
    messagingSenderId: "185099019190",
    appId: "1:185099019190:web:86ff95cdaa00b006a51717"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();