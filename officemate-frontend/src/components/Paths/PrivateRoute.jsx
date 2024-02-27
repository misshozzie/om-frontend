import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Pages/Users/Authprovider";

const PrivateRoute = ({ children }) => {
    const { getUser } = useContext(AuthContext);
    const location = useLocation();


    if (getUser().role == "admin") {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;