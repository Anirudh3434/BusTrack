import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from './firebase.js';
import { app, db } from "./firebase.js";

const auth = getAuth(app);

export const signUp = async (email, password, name, role ) => {
  try {
    // Create a new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    await updateProfile(user, { displayName: name });

  
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: role
    });

    return user;
  } catch (error) {
    console.error('Auth error:', error);
    console.error(error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getCurrentUserName = () => {
  const user = auth.currentUser;
  return user ? user.displayName : null;
};

export const getCurrentUserRole = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    return userDoc.exists() ? userDoc.data().role : null;
  }
  return null;
};

export const LogOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
