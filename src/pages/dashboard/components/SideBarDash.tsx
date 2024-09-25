import { useNavigate } from 'react-router-dom';
import { User, ChevronLeft, LogOut, Settings } from 'lucide-react';
import { useDrawer } from '../../../context/DrawerContext';

export default function SideBarDash() {
    const { open, setOpen } = useDrawer();
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('userPhoto');
        window.location.href = '/';
    };

    return (
        <div
            className={`fixed top-0 mt-5 left-0 h-full bg-gray-800 text-white p-4 transition-all ${open ? 'w-60' : 'w-20'}`}
        >
            <div className="flex justify-end mb-4">
                <button onClick={() => setOpen(!open)} className="text-white">
                    <ChevronLeft />
                </button>
            </div>
            <div>
                <ul className="space-y-6">
                    <li>
                        <button
                            className="flex items-center gap-4 text-white w-full"
                            onClick={() => navigate('/users')}
                        >
                            <User className="w-6 h-6" />
                            {open && <span>Profile</span>}
                        </button>
                    </li>
                    <li>
                        <button
                            className="flex items-center gap-4 text-white w-full"
                            onClick={() => navigate('/setting')}
                        >
                            <Settings className="w-6 h-6" />
                            {open && <span>Setting</span>}
                        </button>
                    </li>
                    <div>
                        <button
                            className="flex items-center gap-4 text-white w-full"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-6 h-6" />
                            {open && <span>Logout</span>}
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
}
