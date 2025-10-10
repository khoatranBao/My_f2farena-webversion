import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { setLogLevel } from 'firebase/app';

const firebaseConfig = { 
    apiKey: "AIzaSyDc8zPSD6_7w_pewLhPntpujap_FLin-Sg", 
    authDomain: "matches-tournaments.firebaseapp.com", 
    projectId: "matches-tournaments", 
    storageBucket: "matches-tournaments.firebasestorage.app", 
    messagingSenderId: "1096742595417", 
    appId: "1:1096742595417:web:7d49585751c694cb603a48", 
    measurementId: "G-LBTR842BNM" 
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

setLogLevel('error');