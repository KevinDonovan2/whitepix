import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; // Import Shadcn UI Avatar components

function NavBar() {
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
                            <AvatarFallback>JD</AvatarFallback>
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
                    <Button variant="ghost" className="p-0">
                        <Avatar>
                            <AvatarImage
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
