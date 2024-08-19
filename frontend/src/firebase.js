// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQsE3tPeCDgsW4hcnMlQsmSSyP-dYfNAY",
    authDomain: "wordwave-d27de.firebaseapp.com",
    projectId: "wordwave-d27de",
    storageBucket: "wordwave-d27de.appspot.com",
    messagingSenderId: "905320637800",
    appId: "1:905320637800:web:3fbfcd5c1755611f6ba2dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app