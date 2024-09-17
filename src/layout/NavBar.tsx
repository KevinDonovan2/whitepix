import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import { Home, MessageCircle, Phone, Users } from 'lucide-react';

function NavBar() {
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

    useEffect(() => {
        const storedPhoto = localStorage.getItem('userPhoto');
        setUserPhoto(storedPhoto);
    }, []);

    // Fonction pour rediriger vers la page des utilisateurs
    const handleProfileClick = () => {
        navigate('/users'); // Rediriger vers la page users
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
                        <div className="ml-4 font-bold text-lg">
                            <span className="text-slate-500">WHITE</span>
                            <span className="text-green-700">PIX</span>
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
                        <Users className="w-6 h-6 mb-1" />
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
                    {/* Bouton pour afficher la photo de l'utilisateur, redirection vers /users */}
                    <Button variant="ghost" className="p-0" onClick={handleProfileClick}>
                        <Avatar>
                            <AvatarImage
                                src={userPhoto || 'https://via.placeholder.com/150'}
                                alt="Profile"
                            />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
