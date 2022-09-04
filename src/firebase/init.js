import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtk8fp6SayBaTTjzISify3wT1AWoC-4wI",
    authDomain: "iblog-8df41.firebaseapp.com",
    projectId: "iblog-8df41",
    storageBucket: "iblog-8df41.appspot.com",
    messagingSenderId: "183894008843",
    appId: "1:183894008843:web:4c7f7838af52f63127930e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
