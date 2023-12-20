import { useAuth } from "../contexts/AuthProvider";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";

const RequireAuth = () => {
    const {authenticatedUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return Object.keys(authenticatedUser).length > 0 ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace/>
    )
}

export default RequireAuth;