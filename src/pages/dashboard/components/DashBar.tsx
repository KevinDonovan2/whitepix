import { MenuIcon, User } from 'lucide-react';
import { useDrawer } from '../../../context/DrawerContext';

export default function DashBar() {
    const { open, setOpen } = useDrawer();

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-700 text-white flex items-center justify-between p-4 shadow-md z-10">
            <button className="text-white" onClick={() => setOpen(!open)}>
                <MenuIcon />
            </button>
            <div>
                <button className="text-white">
                    <User />
                </button>
            </div>
        </header>
    );
}
