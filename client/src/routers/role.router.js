import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const RoleRouter = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    } else {
        let decodeToken = jwt_decode(token);

        if (!decodeToken.username || !decodeToken.role) {
            return <Navigate to="/login" />;
        }
    }

    return <>{children}</>;
};

export default RoleRouter;
