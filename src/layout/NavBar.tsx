import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function NavBar() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; 
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
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
                <div className="space-x-12 flex-1 flex justify-center">
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-300"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-100"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="text-gray-300 hover:text-white border-b-2 border-transparent hover:border-white transition-all duration-300"
                    >
                        Contact
                    </a>
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
        </nav>
    );
}

export default NavBar;
