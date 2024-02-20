import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./components/Users/Authprovider";
import { AllProvider } from "./components/Context/AllContext";
import { router } from "./components/Path/Router";
import "./index.css";

//import AuthProvider from "./Provider/Authprovider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AllProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</AllProvider>
	</React.StrictMode>
);