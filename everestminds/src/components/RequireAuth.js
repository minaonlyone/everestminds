import {useLocation, Navigate, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux'

const RequireAuth = ({ allowedRoles }) => {
    const { user }  = useSelector((state) => state.auth)
    const location = useLocation();
    return (
        user?.roles?.find(role => allowedRoles?.includes (role))
            ? <Outlet />
             : user?.name                                                  
             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
             : <Navigate to="/login" state={{ from: location }} replace />
    );
}
export default RequireAuth;
