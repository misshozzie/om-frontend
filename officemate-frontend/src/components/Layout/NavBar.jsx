import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/Users/Authprovider";
import OfficematesLogo from "../../assets/images/omlogo2.png"; 

const NavBar = ({ username, setUser }) => {
  const { user, getUser } = useContext(AuthContext);
  //console.log(a);
  const navigate = useNavigate();
  useEffect(() => {
    const user = getUser();
    console.log(user);
    if ( getUser() ) {
      navigate(`/widgets`);
    } else {
      console.log("navigating");
      navigate("/login");
    }
  }, []);
  
  const logout = async () => {
    try {
      localStorage.removeItem("user")
      navigate("/login");
    } catch (error) {
    }
  };
  
  return (
    <div>
      <div className="navbar bg-customBlue text-white">
        <div className="navbar-start">
          <div className="dropdown" >
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-customBlue rounded-box w-52"
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
                {getUser()?
                
                <details>
                  <summary>MENU</summary>
                  <ul className="p-3 bg-customBlue rounded-t-none">
                    <li>
                      <Link to="/calendar"
                      onClick={() => navigate(`/user/calendar?username=${username}`)}
                      >Calendar</Link>
                    </li>
                    <li>
                      <Link to="/Notes"
                      onClick={() => navigate(`/user/notes?username=${username}`)}
                      >Notes</Link>
                    </li>
                    <li>
                      <Link to="/pdfConverter"
                      onClick={() => navigate(`/user/pdfConverter?username=${username}`)}
                      >Converter</Link>
                    </li>
                  </ul>
                </details>
                : "" 
                }
              </li>
              <li>
                <Link to="/widgets"
                onClick={() => navigate(`/user/widgets?username=${username}`)}
                >WIDGETS</Link>
              </li>
              {user && (
                <>
                  {user && user && user.role === "user" && (
                    <li>
                      <Link
                        to={`/updateProfile/${user?.email}`}
                      >
                        ACCOUNT
                      </Link>
                    </li>
                  )}
                  {user && user?.role === "admin" && (
                    <li>
                      <Link to="/adminPage">DASHBOARD</Link>
                    </li>
                  )}
                  {/* <li>
                    <Link to="/" onClick={logout}>
                      LOGOUT
                    </Link>
                  </li> */}
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
          <img src={OfficematesLogo} alt="officemateLogo" style={{width:'150px', height:'auto'}} /></Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal md:px-1">


            {getUser()?
            <li>
              <details>
                <summary>MENU</summary>
                <ul className="p-3 bg-customBlue rounded-t-none">
                  <li>
                    <Link to="/calendar"
                    onClick={() => navigate(`/user/calendar?username=${username}`)}
                    >Calendar</Link>
                  </li>
                  <li>
                    <Link to="/Notes"
                    onClick={() => navigate(`/user/notes?username=${username}`)}
                    >Notes</Link>
                  </li>
                  <li>
                    <Link to="/pdfConverter"
                    onClick={() => navigate(`/user/pdfConverter?username=${username}`)}
                    >Converter</Link>
                  </li>
                </ul>
              </details>
            </li>
            : ""
            }
            { getUser() ?
              <li>
                <Link to="/widgets">WIDGETS</Link>
              </li>
              : 
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
  
            }
            {user && user.auth && (
              <>
                {user && user && user.role === "user" && (
                  <li>
                    <Link
                      to={`/updateProfile/${user?.email}`}
                    >
                      ACCOUNT
                    </Link>
                  </li>
                )}
                {user && user?.role === "admin" && (
                  <li>
                    <Link to="/adminPage">DASHBOARD</Link>
                  </li>
                )}
                {/* <li>
                  <Link to="/login" onClick={logout}>
                    LOGOUT
                  </Link>
                </li> */}
              </>
            )}

            { getUser() ?
            <li>
              <Link to="/login" onClick={logout}>Logout</Link>
            </li>
            : ""
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;