import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import SignUp from "../Pages/Users/Signup/Signup";
import NavBar from "../Layout/NavBar";
import UpdateProfile from "../Pages/Users/UpdateProfile";
import Widgets from "../Pages/Widgets"
import Converter from "../Pages/Converter/Converter";
import Login from "../Pages/Users/Login/Login";
import Calendar from "../Pages/Calendar";
import Note from "../Pages/Notes/Note";
import AddNote from "../Pages/Notes/AddNote";
import ViewNote from "../Pages/Notes/ViewNote";
import AddTask from "../Pages/Tasks/AddTask";
import UpdateNote from "../Pages/Notes/UpdateNote";
import AdminPage from "../Pages/Users/AdminPage";
import PrivateRoute from "./PrivateRoute";  
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
        path: "/adminpage",
        element: <PrivateRoute> <AdminPage /></PrivateRoute>,
      },
    ],
  },
]);

