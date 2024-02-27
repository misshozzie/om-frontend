import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AllProvider } from "./components/Pages/AllContext";
import { router } from "./components/Paths/Router";
//import AuthProvider from "./components/Pages/Users/Authprovider";
import "./index.css";
import AuthProvider from "./components/Pages/Users/Authprovider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
	<AuthProvider>
    <AllProvider>
      <RouterProvider router={router} />
    </AllProvider>
	</AuthProvider>
  </React.StrictMode>
);
