import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYQCFJp0O1eNs4m4qDmvKvQ-EYU_yUAUQ",
  authDomain: "x-clonning.firebaseapp.com",
  projectId: "x-clonning",
  storageBucket: "x-clonning.appspot.com",
  messagingSenderId: "680059791840",
  appId: "1:680059791840:web:291132e51ff81a1db52385",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
