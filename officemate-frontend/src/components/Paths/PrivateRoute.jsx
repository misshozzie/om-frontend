import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../components/Pages/Users/Authprovider";

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();


    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;