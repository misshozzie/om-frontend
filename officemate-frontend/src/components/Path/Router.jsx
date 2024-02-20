import SignUp from "../Users/SignUp/SignupForm";
import UpdateProfile from "../Users/ProfileUpdate/ProfileUpdateForm";
import NavBar from "../Share/NavBar";
import HomePage from "../../pages/Home/HomePage";
import Login from "../Users/Login/LoginForm";
import Widgets from "../../pages/Widgets/Widgets"
import PrivateRoute from "../Path/PrivateRoute";
import { createBrowserRouter } from 'react-router-dom';
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
          path:"/updateProfile/:email",
          element: <PrivateRoute><UpdateProfile /></PrivateRoute>,
        },
        {
          path: "/widgets",
          element: <Widgets />,
        },
        {
          //path: "/pdfConverter",
          //element: <Converter />,
        },
        {
          //path: "/calendar",
          //element: <Calendar />,
        },
        {
          //path: "/Notes",
          //element: <Note />,
        },
        {
          //path: "/Notes/addNote",
          //element: <AddNote />,
        },
        {
          //path: "/Notes/viewNote/:id",
          //element: <ViewNote />,
        },
        {
          //path: "/Notes/addTask/:id",
          //element: <AddTask />,
        },
        {
          //path: "/Notes/updateNote/:id",
          //element: <UpdateNote />,
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