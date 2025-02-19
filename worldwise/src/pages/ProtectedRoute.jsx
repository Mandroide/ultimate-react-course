import useAuth from "../hooks/useAuth.js";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children}) {
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? children : <Navigate replace to="/"/>;
}

export default ProtectedRoute;