import { Navigate, Outlet } from 'react-router-dom';

// Durée maximale de la session en millisecondes (exemple : 30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

function PrivateRoute() {
    const token = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
        const currentTime = new Date().getTime();
        const timeSinceLogin = currentTime - parseInt(loginTime, 10);

        // Vérifier si la session a expiré
        if (timeSinceLogin > SESSION_TIMEOUT) {
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            return <Navigate to="/" />; // Rediriger vers la page de connexion
        }
    } else {
        return <Navigate to="/" />; // Rediriger si pas de token
    }

    return <Outlet />;
}

export default PrivateRoute;
