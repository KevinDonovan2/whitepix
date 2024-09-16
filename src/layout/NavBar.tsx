import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, Briefcase, Phone } from 'lucide-react';

function NavBar() {
    const [userPhoto, setUserPhoto] = useState<string | null>(null);

    useEffect(() => {
        const storedPhoto = localStorage.getItem('userPhoto');
        setUserPhoto(storedPhoto);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('userPhoto'); 
        window.location.href = '/';
    };

    return (
        <div className="secondary text-black p-3 mt-4 ml-4 mr-4 rounded-2xl ">
            <div className="container flex justify-between ">
                <div>
                    <Button variant="ghost" className="p-0">
                        <Avatar>
                            <AvatarImage src="/whitepix1.png" alt="Logo" />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
                        <div className='ml-4 font-bold text-lg'>
                            <span className='text-slate-500'>
                                WHITE
                            </span>
                            <span className='text-green-700'>
                                PIX
                            </span>
                        </div>
                    </Button>
                </div>
                <div className="space-x-12 flex-1 flex justify-center text-sm ">
                    <Link
                        to="/home"
                        className="flex flex-col items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition-all duration-300"
                    >
                        <Home className="w-6 h-6 mb-1" />
                        Home
                    </Link>
                    <Link
                        to="/chat"
                        className="flex flex-col items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition-all duration-300"
                    >
                        <MessageCircle className="w-6 h-6 mb-1" />
                        Chat
                    </Link>
                    <Link
                        to="/services"
                        className="flex flex-col items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition-all duration-100"
                    >
                        <Briefcase className="w-6 h-6 mb-1" />
                        People
                    </Link>
                    <Link
                        to="/contact"
                        className="flex flex-col items-center hover:text-blue-400 border-b-2 border-transparent hover:border-blue-400 transition-all duration-300"
                    >
                        <Phone className="w-6 h-6 mb-1" />
                        Contact
                    </Link>
                </div>
                <div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <Button variant="ghost" className="p-0">
                                <Avatar>
                                    {/* Afficher la photo de l'utilisateur ou une image par défaut */}
                                    <AvatarImage
                                        src={
                                            userPhoto ||
                                            'https://via.placeholder.com/150'
                                        }
                                        alt="Profile"
                                    />
                                    <AvatarFallback>Profile</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                            align="end"
                            className="bg-white text-black rounded-md shadow-lg p-2"
                        >
                            <DropdownMenu.Item
                                onClick={handleLogout}
                                className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
                            >
                                Logout
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
