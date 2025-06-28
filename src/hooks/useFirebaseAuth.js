import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Initialize Firebase (make sure you don’t call this multiple times)
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCDm_1kQ-XJlf_EjpBatI2_oYWv7sofRzU",
    authDomain: "sign-in-5fb04.firebaseapp.com",
    projectId: "sign-in-5fb04",
    storageBucket: "sign-in-5fb04.firebasestorage.app",
    messagingSenderId: "840402243302",
    appId: "1:840402243302:web:e0ccda8f866c8321b27527",
    measurementId: "G-SLTQ77RJBR"
  });
}

const auth = firebase.auth();

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((person) => {
      setUser(person || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  const signOut = () => {
    localStorage.removeItem("activeSessionId");
    auth.signOut();
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    auth
  };
};
