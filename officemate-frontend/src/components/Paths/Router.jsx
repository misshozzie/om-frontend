import App from "../../App";
import Login from "../Pages/Users/Login";
import HomePage from "../Pages/HomePage";
import SignUp from "../Pages/Users/Signup";
import NavBar from "../Layout/Footer";
import UpdateProfile from "../Pages/Users/UpdateProfile";
import Widgets from "../Pages/Widgets"
import Converter from "../Pages/";


import Login from "../Users/Login/LoginForm";
import Converter from "../Pages/Converter";
import Calendar from "../Pages/Calendar";
import Note from "../Pages/Notes/Note";
import AddNote from "../../pages/Notes/AddNote";
import ViewNote from "../"
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/NavBar",
        element: <NavBar />,
      },
      {
        path: "/updateProfile/:email",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/widgets",
        element: <Widgets />,
      },
      {
        path: "/pdfConverter",
        element: <Converter />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/Notes",
        element: <Note />,
      },
      {
        path: "/Notes/addNote",
        element: <AddNote />,
      },
      {
        path: "/Notes/viewNote/:id",
        element: <ViewNote />,
      },
      {
        path: "/Notes/addTask/:id",
        element: <AddTask />,
      },
      {
        path: "/Notes/updateNote/:id",
        element: <UpdateNote />,
      },
      {
        //path: "/adminpage",
        //element: <PrivateRoute><AdminPage /></PrivateRoute>,
      },
    ],
  },
]);

// function createAppRouter() {
//   return createAppRouter([
// {
//   path: "/",
//       element: <Main />,
//       children: [
//         { path: "/", element: <HomePage /> },
//         { path: "/login", element: <Login /> },
//         { path: "/signup", element: <SignUp /> },
//         { path: "/NavBar", element: <NavBar /> },
//         {
//           path:"/updateProfile/:email",
//           element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
//         },
//         { path: "/widgets", element: <Widgets /> },
//         { path: "/pdfConverter", element: <Converter /> },
//         { path: "/calendar", element: <Calendar /> },
//         { path: "/Notes", element: <Note /> },
//         { path: "/Notes/addNote", element: <AddNote /> },
//         { path: "/Notes/viewNote/:id", element: <ViewNote /> },
//         { path: "/Notes/addTask/:id", element: <AddTask /> },
//         { path: "/Notes/updateNote/:id", element: <UpdateNote /> },
//         {
//           path: "/adminpage",
//           element: <PrivateRoute><AdminPage /></PrivateRoute>,
//         },
//       ],
//     },
//   ]);
// }

// export default createAppRouter();
