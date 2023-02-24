import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAcCXMv9tOV-aan7EJGuh6TedxqeklfBWo",
    authDomain: "yaya-72d9a.firebaseapp.com",
    projectId: "yaya-72d9a",
    storageBucket: "yaya-72d9a.appspot.com",
    messagingSenderId: "429047553770",
    appId: "1:429047553770:web:8d5c57e2829d8a0f074193"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db