    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider } from "firebase/auth";

    // const firebaseConfig = {
    //   apiKey: import.meta.env.VITE_apiKey,
    //   authDomain: import.meta.env.VITE_authDomain,
    //   projectId: import.meta.env.VITE_projectId,
    //   storageBucket: import.meta.env.VITE_storageBucket,
    //   messagingSenderId: import.meta.env.VITE_messagingSenderId,
    //   appId: import.meta.env.VITE_appId
    // };
    
    const firebaseConfig = {
      apiKey: "AIzaSyDxSzj3KeH5wvkpZXiEjsMAkr4KBL3yJOk",
      authDomain: "officemate-4862e.firebaseapp.com",
      projectId: "officemate-4862e",
      storageBucket: "officemate-4862e.appspot.com",
      messagingSenderId: "637219469946",
      appId: "1:637219469946:web:b77ad0226c77e85fdcd9c3",
      measurementId: "G-02JWTTH9VD"
    };
    
    export const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const GoogleProvider = new GoogleAuthProvider();