import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePublication from './components/CreatePublication';
import Publication from './components/Publication';
import NavBar from '@/layout/NavBar';
import SideRightPage from './SideRightPage';
import SideLeftPage from './SideLeftPage';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
        }
    }, [navigate]);
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
