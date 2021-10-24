import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAh62yK7wVKy2a-B34kLMnLbevCnYhJ5rw",
    authDomain: "bpmn-jini2.firebaseapp.com",
    projectId: "bpmn-jini2",
    storageBucket: "bpmn-jini2.appspot.com",
    messagingSenderId: "1098859896795",
    appId: "1:1098859896795:web:c2886c5ab8217bde0651fe"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

  