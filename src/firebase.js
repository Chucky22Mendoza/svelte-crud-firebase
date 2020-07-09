import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDNhSOvyFHUF5AxjJUofGdKkCutfnrAHBI",
    authDomain: "svelte-crud-4691e.firebaseapp.com",
    databaseURL: "https://svelte-crud-4691e.firebaseio.com",
    projectId: "svelte-crud-4691e",
    storageBucket: "svelte-crud-4691e.appspot.com",
    messagingSenderId: "966194849212",
    appId: "1:966194849212:web:7cdfa0e16d38c263fcb7b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
