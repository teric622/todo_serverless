// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyC2xQDse_aMLMtNr0fDIjUmNZkKtei3Z5A",
    authDomain: "todo-app-8b112.firebaseapp.com",
    projectId: "todo-app-8b112",
    storageBucket: "todo-app-8b112.appspot.com",
    messagingSenderId: "806615518683",
    appId: "1:806615518683:web:0c55adbcee6e744c3aabfe"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);