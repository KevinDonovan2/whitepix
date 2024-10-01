import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';

interface User {
    id: number;
    name: string;
    photo: string;
}

export default function Friend() {
    const [users, setUsers] = useState<User[]>([]);
    const token = localStorage.getItem('token');
    const axiosConfig = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        [token]
    );

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8081/users', axiosConfig)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.error(
                        'Erreur lors de la récupération des utilisateurs:',
                        error
                    );
                    toast.error(
                        'Failed to retrieve users. Please try again later.'
                    );
                });
        } else {
            toast.error('Token is missing. Please log in again.');
        }
    }, [token, axiosConfig]);

    return (
        <div className=" w-full h-full rounded-r-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Friend List</h2>
            <div className="grid grid-cols-4 gap-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="flex flex-col bg-white rounded-lg shadow-md"
                        >
                            <div className="flex flex-col items-center">
                                <Avatar className="w-full h-full overflow-hidden">
                                    <img
                                        src={user.photo || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'}
                                        alt={`${user.name} photo`}
                                        className="w-full h-full object-cover rounded-t-lg"
                                    />
                                </Avatar>
                                <h2 className="text-lg font-bold">
                                    {user.name}
                                </h2>
                            </div>
                            <div className="gap-2 flex flex-col m-2">
                                <Button className="bg-blue-400 hover:bg-blue-500 w-full font-bold h-[40%]">
                                    Inviter
                                </Button>
                                <Button className="bg-gray-500 hover:bg-gray-600 w-full font-bold h-[40%]">
                                    Supprimer
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
}
