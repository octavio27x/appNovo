import { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCFCjz3n5s6rIt3YuvAhuRJg6qnWwaloZ4",
 authDomain: "appdepsicologos.firebaseapp.com",
  projectId: "appdepsicologos",
  storageBucket: "appdepsicologos.firebasestorage.app",
  messagingSenderId: "213770142762",
  appId: "1:213770142762:web:cbc72176c92464552baf53"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);