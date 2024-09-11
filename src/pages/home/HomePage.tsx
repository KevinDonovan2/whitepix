import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePublication from '@/features/landingPage/CreatePublication';
import Publication from '@/features/landingPage/Publication';
import NavBar from '@/layout/NavBar';
import SideRightPage from './SideRightPage';
import SideLeftPage from './SideLeftPage';

function HomePage() {
    const navigate = useNavigate();

    // Durée maximale de la session en millisecondes (exemple : 30 minutes)
    const SESSION_TIMEOUT = 30 * 60 * 1000;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');

        if (!token || !loginTime) {
            navigate('/'); // Rediriger vers la page de connexion si non connecté
            return;
        }

        const currentTime = new Date().getTime();
        const timeSinceLogin = currentTime - parseInt(loginTime, 10);

        // Si le délai d'inactivité est dépassé, déconnecter l'utilisateur
        if (timeSinceLogin > SESSION_TIMEOUT) {
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            navigate('/'); // Rediriger vers la page de connexion
        } else {
            // Réinitialiser le timer de session à chaque interaction
            const resetLoginTime = () => {
                localStorage.setItem(
                    'loginTime',
                    new Date().getTime().toString()
                );
            };

            const events = ['click', 'mousemove', 'keydown'];
            events.forEach((event) =>
                window.addEventListener(event, resetLoginTime)
            );

            // Nettoyer les événements lorsque le composant se démonte
            return () => {
                events.forEach((event) =>
                    window.removeEventListener(event, resetLoginTime)
                );
            };
        }
    }, [navigate, SESSION_TIMEOUT]); // Added SESSION_TIMEOUT to the dependency array

    return (
        <div className="h-screen bg-[rgb(39,39,65)] flex flex-col">
            <NavBar />
            <div className="flex flex-1 flex-row justify-center gap-8 overflow-y-auto">
                <div >
                    <SideLeftPage />
                </div>    
                <div className='overflow-y-auto z-0 hide-scrollbar'>
                    <CreatePublication />
                    <Publication />
                </div>
                <div >
                    <SideRightPage />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
