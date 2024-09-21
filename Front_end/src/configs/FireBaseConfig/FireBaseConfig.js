// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "",
//   authDomain: "shop-shoe-b3974.firebaseapp.com",
//   projectId: "shop-shoe-b3974",
//   storageBucket: "shop-shoe-b3974.appspot.com",
//   messagingSenderId: "",
//   appId: ""
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
