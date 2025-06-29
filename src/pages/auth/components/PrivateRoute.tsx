import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute;
