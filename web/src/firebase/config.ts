import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwdG257-hbASsudCdQa10v2MwFcuynqVA",
    authDomain: "broadcast-tech-challenge.firebaseapp.com",
    projectId: "broadcast-tech-challenge",
    storageBucket: "broadcast-tech-challenge.firebasestorage.app",
    messagingSenderId: "152971907199",
    appId: "1:152971907199:web:1f552cf22c624a921def4a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;