import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, Briefcase, Phone } from 'lucide-react';

function NavBar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
        window.location.href = '/';
    };

    return (
        <div className="bg-white text-black p-3 m-4 rounded-2xl">
            <div className="container flex justify-between items-center">
                <div>
                    <Button variant="ghost" className="p-0">
                        <Avatar>
                            <AvatarImage
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                            />
                            <AvatarFallback>Logo</AvatarFallback>
                        </Avatar>
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
                        Services
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
                                    <AvatarImage
                                        src="https://via.placeholder.com/150"
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
