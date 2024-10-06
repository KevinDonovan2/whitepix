import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePublication from './components/CreatePublication';
import Publication from './components/Publication';
import NavBar from '@/layout/NavBar';
import SideRightPage from './SideRightPage';
import SideLeftPage from './SideLeftPage';

function HomePage() {
    const navigate = useNavigate();

    const SESSION_TIMEOUT = 100 * 60 * 1000;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loginTime = localStorage.getItem('loginTime');

        if (!token || !loginTime) {
            navigate('/');
            return;
        }

        const currentTime = new Date().getTime();
        const timeSinceLogin = currentTime - parseInt(loginTime, 10);

        if (timeSinceLogin > SESSION_TIMEOUT) {
            localStorage.removeItem('token');
            localStorage.removeItem('loginTime');
            navigate('/');
        } else {
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

            return () => {
                events.forEach((event) =>
                    window.removeEventListener(event, resetLoginTime)
                );
            };
        }
    }, [navigate, SESSION_TIMEOUT]);

    return (
        <div className="h-screen primary flex flex-col">
            <NavBar />
            <div className="flex flex-1 flex-row justify-center gap-8 overflow-y-auto p-6">
                <div>
                    <SideLeftPage />
                </div>
                <div className="overflow-y-auto z-0 hide-scrollbar w-[50vw] ">
                    <CreatePublication />
                    <Publication />
                </div>
                <div>
                    <SideRightPage />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
