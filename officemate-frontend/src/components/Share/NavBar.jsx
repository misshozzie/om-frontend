import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Users/Authprovider";
import axios from "axios";

function NavBar() {
  const { user, logOut } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Function to fetch all users from the server
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user");
        const Data = response.data;
        const foundUser = Data.find((u) => u.email === user.email);
        setCurrentUser(foundUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    // Call the fetchAllUsers function when the component mounts
    fetchAllUsers();
  }, [user]); // Empty dependency array ensures that this effect runs only once, on component mount

  const handleLogOut = () => {
    logOut();
  };
  return (
    <div>
      <div className="navbar bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-500 rounded-box w-52"
            >
              {!user && (
                <>
                  <li>
                    <Link to="/login">LOGIN</Link>
                  </li>
                  <li>
                    <Link to="/signup">SIGNUP</Link>
                  </li>
                </>
              )}
              <li>
                <details>
                  <summary>MENU</summary>
                  <ul className="p-3 bg-slate-500 rounded-t-none">
                    <li>
                      <Link to="/calendar">Calender</Link>
                    </li>
                    <li>
                      <Link to="/Notes">Notes</Link>
                    </li>
                    <li>
                      <Link to="/pdfConverter">Converter</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to="/widgets">WIDGETS</Link>
              </li>
              {user && (
                <>
                  {user && currentUser && currentUser.role === "user" && (
                    <li>
                      <Link
                        to={`/updateProfile/${currentUser?.email}`} // Pass current user's email as URL parameter
                      >
                        ACCOUNT
                      </Link>
                    </li>
                  )}
                  {currentUser && currentUser.role === "admin" && (
                    <li>
                      <Link to="/adminPage">DASHBOARD</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/" onClick={handleLogOut}>
                      LOGOUT
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            LOGO
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal md:px-1">
            {!user && (
              <li>
                <h1 className="italic">
                  Login
                  <NavLink to="/login" className="link link-primary text-white">
                    here!
                  </NavLink>
                  Not yet a member?
                  <NavLink
                    to="/signup"
                    className="link link-primary text-white"
                  >
                    Join us now!
                  </NavLink>
                </h1>
              </li>
            )}
            <li>
              <details>
                <summary>MENU</summary>
                <ul className="p-3 bg-slate-500 rounded-t-none">
                  <li>
                    <Link to="/calendar">Calender</Link>
                  </li>
                  <li>
                    <Link to="/Notes">Notes</Link>
                  </li>
                  <li>
                    <Link to="/pdfConverter">Converter</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/widgets">WIDGETS</Link>
            </li>
            {user && (
              <>
                {user && currentUser && currentUser.role === "user" && (
                  <li>
                    <Link
                      to={`/updateProfile/${currentUser?.email}`} // Pass current user's email as URL parameter
                    >
                      ACCOUNT
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.role === "admin" && (
                  <li>
                    <Link to="/adminPage">DASHBOARD</Link>
                  </li>
                )}
                <li>
                  <Link to="/" onClick={handleLogOut}>
                    LOGOUT
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
