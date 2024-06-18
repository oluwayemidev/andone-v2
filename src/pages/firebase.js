import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, setDoc, onSnapshot, query, orderBy, serverTimestamp, where } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, set, onDisconnect, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDBtAFhXsShmLSlNZDMkToEcZXEJDV9d1s",
    authDomain: "andonesolar.firebaseapp.com",
    projectId: "andonesolar",
    storageBucket: "andonesolar.appspot.com",
    messagingSenderId: "941509979671",
    appId: "1:941509979671:web:39276c2c00a2b61ae73652",
    measurementId: "G-DZJ720NSZ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const rtdb = getDatabase(app); // Add Realtime Database


export { db, rtdb, set, onDisconnect, onValue, where, collection, addDoc, getDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp, storage, ref, uploadBytes, getDownloadURL, auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, RecaptchaVerifier, signInWithPhoneNumber, sendEmailVerification, onAuthStateChanged, signOut };
