// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDXHEEzKna5XfaJo93jzwWvUnqEQCD_08",
  authDomain: "fir-proy-16d0c.firebaseapp.com",
  projectId: "fir-proy-16d0c",
  storageBucket: "fir-proy-16d0c.firebasestorage.app",
  messagingSenderId: "876566895776",
  appId: "1:876566895776:web:08222be0bc6a2c4df07dc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;