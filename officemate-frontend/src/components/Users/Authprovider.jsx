import {
    GoogleAuthProvider,
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import { app } from "../firebase/firebase.config";
  import axios from "axios";
  
  export const AuthContext = createContext(null);
  
  const auth = getAuth(app);
  
  // eslint-disable-next-line react/prop-types
  function AuthProvider(children) {
  //const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const googleProvider = new GoogleAuthProvider();
  
    const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    // useEffect(() => {
    //   // Check if user is already logged in (persisting state)
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     // Decode the token to get user details
    //     // const decodedToken = jwt_decode(token);
    //     setUser(token);
    //   }
    //   setLoading(false);
    // }, []);
  
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
        // if (currentUser) {
        //   axios
        //     .post("http://localhost:5000/jwt", {
        //       email: currentUser.email,
        //     })
        //     .then((data) => {
        //       localStorage.setItem("access-token", data.data.token);
        //       setLoading(false);
        //     });
        // } else {
        //   localStorage.removeItem("access-token");
        // }
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