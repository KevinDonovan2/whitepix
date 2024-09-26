import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';

const users = [
    { id: 1, name: 'John Doe', photo: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', photo: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Emily Johnson', photo: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Emily Johnson', photo: 'https://i.pravatar.cc/150?img=3' }
];

export default function Friend() {
    return (
        <div className="bg-gray-300 w-full h-[80vh] rounded-r-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Friend List</h2>
            <div className="flex flex-row gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-col bg-white rounded-lg shadow-md w-full"
                    >
                        <div className="flex flex-col items-center">
                            <Avatar className="w-full h-full overflow-hidden">
                                <img
                                    src={user.photo}
                                    alt={`${user.name} photo`}
                                    className="w-full h-full object-cover rounded-t-lg"
                                />
                            </Avatar>
                            <h2 className="text-sm font-medium ">
                                {user.name}
                            </h2>
                        </div>
                        <div className="gap-2 flex flex-col m-2">
                            <Button className="bg-blue-400 hover:bg-blue-500 w-full font-bold  h-[40%]">
                                Inviter
                            </Button>
                            <Button className="bg-gray-500 hover:bg-gray-600 w-full font-bold h-[40%]">
                                Supprimer
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
