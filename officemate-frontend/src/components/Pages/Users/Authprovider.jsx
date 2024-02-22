import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { app } from  "../../../firebase/firebase.config";
  import axios from "axios";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  
  
  function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
  
    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    const logOut = () => {
      setLoading(true);
      signOut(auth)
        .then(() => {
          localStorage.removeItem("token"); // Remove token from local storage
          setUser(null);
        })
        .catch((error) => {
          console.error("Sign out error:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        return unsubscribe();
      };
    }, []);
  
    const authInfo = {
      user,
      setUser,
      loading,
      logOut,
      googleSignIn,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  export default AuthProvider;