import { Navigate, Outlet } from 'react-router-dom';

const SESSION_TIMEOUT = 100 * 60 * 1000;

function PrivateRoute() {
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
        const currentTime = new Date().getTime();
        const timeSinceLogin = currentTime - parseInt(loginTime, 10);

        if (timeSinceLogin > SESSION_TIMEOUT) {
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            return <Navigate to="/" />;
        }
    } else {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute;
