// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA05AvyxBoQHxruOjsnb9Acd_d7kMjKaTA',
	authDomain: 'envis-e3b45.firebaseapp.com',
	projectId: 'envis-e3b45',
	storageBucket: 'envis-e3b45.appspot.com',
	messagingSenderId: '34045069039',
	appId: '1:34045069039:web:1906eb48834590ab257d1a',
	measurementId: 'G-0JDL4B2WTZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export const userId = 'dummy-user-id';
