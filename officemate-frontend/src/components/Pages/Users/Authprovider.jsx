import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from  "../../../firebase/firebase.config.js";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);


function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signup = async (user) => {
    try {

      const data = {...user,role: "user"}
      const response = await axios.post("http://localhost:3000/users/create",data);
      return response.data;
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error
    }
  }

  const login = async (email,password) => {
    try {
      const data = {email,password}
      const response = await axios.post("http://localhost:3000/users/login",data);
      // if (response.data.success)
      setUser(response.data);
      localStorage.setItem("user",JSON.stringify(response.data.data));
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error
    }
  }

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
  
  // const getUser = () => {
  //   const u = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  //   if (!u || !u.id) {
  //     return false;
  //   } else {
  //     return u;
  //   }
  // }

  const getUser = () => {
    const userItem = localStorage.getItem("user");
    if (userItem && userItem !== "undefined") {
      const u = JSON.parse(userItem);
      if (u && u.id) {
        return u;
      }
    }
    return false;
  };
  const authInfo = {
    user,
    setUser,
    loading,
    logOut,
    googleSignIn,
    login,
    getUser,
    signup
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;