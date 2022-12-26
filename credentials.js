// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEIxtH8lYyRfjGCmk7kqVzNZwJ6hwPFaw",
  authDomain: "auth-firestore-storage-d517b.firebaseapp.com",
  projectId: "auth-firestore-storage-d517b",
  storageBucket: "auth-firestore-storage-d517b.appspot.com",
  messagingSenderId: "177732185731",
  appId: "1:177732185731:web:c5eabe52a25ceb87baf5b6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
