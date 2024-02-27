
    import { initializeApp } from "firebase/app";
    import { getAuth, GoogleAuthProvider } from "firebase/auth";

    const firebaseConfig = {
      apiKey: "VITE_apiKey",
      authDomain: "VITE_authDomain",
      projectId: "VITE_projectId",
      storageBucket: "VITE_storageBucket",
      messagingSenderId: "VITE_messagingSenderId",
      appId: "VITE_appId",
      measurementId: "VITE_MeasurementId"
    };
    
    export const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const GoogleProvider = new GoogleAuthProvider();