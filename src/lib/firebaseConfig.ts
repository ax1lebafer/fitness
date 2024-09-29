import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe303N5lveZUkzXVtnlymO0TCQHc3VudI",
  authDomain: "fitnes-pro-33359.firebaseapp.com",
  databaseURL: "https://fitnes-pro-33359-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitnes-pro-33359",
  storageBucket: "fitnes-pro-33359.appspot.com",
  messagingSenderId: "29721984613",
  appId: "1:29721984613:web:0d18492c17e004c13b908c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 export { app, auth };