import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBRSj_wRFtPyg7OJFCFXVbI9YUAyil2Pn4",
  authDomain: "start-application-35a1c.firebaseapp.com",
  projectId: "start-application-35a1c",
  storageBucket: "start-application-35a1c.appspot.com",
  messagingSenderId: "761209290365",
  appId: "1:761209290365:web:710d15a5d6b6aa9e86bb14",
  measurementId: "G-QHW9FCDJM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const signOutUser = () => {
    signOut(auth)
    localStorage.removeItem('e')
    localStorage.removeItem('n')
    localStorage.removeItem('p')
    window.location.reload()
};
export{auth, provider, signInWithPopup, signOutUser}