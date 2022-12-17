import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../Firebase/firebase.init';

export const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Create New User With Email and Password
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Sign with With Email and Password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }


  // Sign In With Google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }


  // Update User 
  const updateUser = (userInfo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, userInfo)
  }

  // logout
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  // OnAuth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('On auth changes', currentUser)
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }

  }, [])

  const authInfo = {
    user,
    createUser,
    signIn,
    signInWithGoogle,
    updateUser,
    logOut,
    loading
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;