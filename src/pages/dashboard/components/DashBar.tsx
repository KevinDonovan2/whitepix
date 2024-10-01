import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDrawer } from '../../../context/DrawerContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export default function DashBar() {
    const { open, setOpen } = useDrawer();
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPhoto = localStorage.getItem('userPhoto');
        if (storedPhoto && storedPhoto !== 'null') {
            setUserPhoto(storedPhoto);
        } else {
            setUserPhoto(null);
        }
    }, []);

    const handleProfileClick = () => {
        navigate('/users');
    };
    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-700 text-white flex items-center justify-between p-2 shadow-md z-10">
            <button className="text-white" onClick={() => setOpen(!open)}>
                <MenuIcon />
            </button>
            <div>
                <Button
                    variant="ghost"
                    className=""
                    onClick={handleProfileClick}
                >
                    <Avatar>
                        <AvatarImage
                            src={
                                userPhoto ||
                                'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                            }
                            alt="Profile"
                        />
                        <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                </Button>
            </div>
        </header>
    );
}
