import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "../src/components/Users/Authprovider";
import "./index.css";
// import AuthProvider from "./Provider/Authprovider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AllProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</AllProvider>
	</React.StrictMode>
);