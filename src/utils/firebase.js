// Firebase configuration for Shreshta Lunch App
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyALUQM3fn8JoOVQeM0_8isMkcbr9vvRUSU",
    authDomain: "shreshta-lunch-app.firebaseapp.com",
    projectId: "shreshta-lunch-app",
    storageBucket: "shreshta-lunch-app.firebasestorage.app",
    messagingSenderId: "69610517328",
    appId: "1:69610517328:web:c588392eb5e61bdcd5f255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};

// Firestore functions for schedule sync
export const saveScheduleToCloud = async (userId, profileId, schedule) => {
    try {
        const docRef = doc(db, 'schedules', `${userId}_${profileId}`);
        await setDoc(docRef, {
            schedule,
            updatedAt: new Date().toISOString(),
            profileId
        });
        console.log('Schedule saved to cloud');
    } catch (error) {
        console.error('Error saving schedule:', error);
        throw error;
    }
};

export const getScheduleFromCloud = async (userId, profileId) => {
    try {
        const docRef = doc(db, 'schedules', `${userId}_${profileId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().schedule;
        }
        return null;
    } catch (error) {
        console.error('Error fetching schedule:', error);
        return null;
    }
};

// Real-time listener for schedule changes
export const subscribeToSchedule = (userId, profileId, callback) => {
    const docRef = doc(db, 'schedules', `${userId}_${profileId}`);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data().schedule);
        }
    });
};

export { onAuthStateChanged };
