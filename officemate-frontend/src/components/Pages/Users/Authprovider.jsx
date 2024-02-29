import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
//import { firebase } from "../../firebase/firebase.config";
//import { firebaseConfig } from '../../../firebase/firebase.config';
import { createContext, useEffect, useState } from "react";
import { app } from "../../../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null); ; //will be used to share authentication state and function across diff. components
const auth = getAuth(app); //this is provided by Firebase SDK. and returns an authentication object

function AuthProvider({ children }) {  // responsible for managing the authentication state and providing the authentication context to the rest of the application
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider(); //***** class from the Firebase SDK. This provider will be used for signing in with Google authentication.

  const signup = async (user) => { // function to sign up a user
    try {

      const data = {...user,role: "user"} //
      const response = await axios.post(import.meta.env.VITE_BASE_URL +"/users/create",data); // send a POST request to the server
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
      const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login",data);
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
    return signInWithPopup(auth, googleProvider); // ******This function will open a popup window and ask the user to sign in with their Google account.
  };

  const logOut = () => {
    setLoading(true);// This function will sign out the user from the application.
    signOut(auth) // This function will sign out the user from the application.
      .then(() => {
        localStorage.removeItem("token"); // This function will remove the token from the local storage.
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // This function will listen for the authentication state changes.
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  // const getUser = () => {
  //   const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  //   if (!user || !user.id) {
  //     return false;
  //   } else {
  //     return u;
  //   }
  // }

  const getUser = () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) {
        return false; // No user data in local storage
      }
      const userObj = JSON.parse(userString);
      if (!userObj || !userObj.id) {
        return false; // Invalid user data
      }
      return userObj;
    } catch (error) {
      console.error("Error parsing user from local storage:", error);
      return false;
    }
  }
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