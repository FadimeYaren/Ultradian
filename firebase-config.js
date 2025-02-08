// Firebase modüllerini içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { addDoc, collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "AIzaSyCu8fyq2rMQvUEWXAKMkCt0a3TO4EXaz78",
    authDomain: "ultradian-91088.firebaseapp.com",
    projectId: "ultradian-91088",
    storageBucket: "ultradian-91088.appspot.com",
    messagingSenderId: "708440458855",
    appId: "1:708440458855:web:fd682a86fd9ca88a8fb6c2",
    measurementId: "G-RFB4GSZJ7C"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore bağlantısını başlat

// Firestore bağlantısını dışa aktar
export { addDoc, collection, db, getDocs };

