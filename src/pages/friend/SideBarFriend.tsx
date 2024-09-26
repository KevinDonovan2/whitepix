import { UserPlus, UserRoundCheck } from 'lucide-react';

export default function SideBarFriend() {
    return (
        <div className="w-1/3 bg-white p-4 rounded-l-lg">
            <h1 className="text-2xl font-semibold mb-4">Amis(0)</h1>
            <ul className="flex flex-col gap-2">
                <li className="flex items-center p-2 cursor-pointer rounded-lg bg-gray-100">
                    <div className="bg-blue-400 rounded-xl p-2 mr-4 text-white">
                        <UserPlus />
                    </div>
                    <span>Accueil</span>
                </li>
                <li className="flex items-center p-2 cursor-pointer rounded-lg bg-gray-100">
                    <div className="bg-blue-400 rounded-xl p-2 mr-4 text-white">
                        <UserRoundCheck />
                    </div>
                    <span>Invitations</span>
                </li>
            </ul>
        </div>
    );
}
