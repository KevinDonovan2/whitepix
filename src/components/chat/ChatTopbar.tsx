import React from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Info, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

interface User {
    id: string;
    name: string;
    photo: string;
}

interface ChatTopbarProps {
    selectedUser: User | null;
}

const topbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

const ChatTopbar: React.FC<ChatTopbarProps> = ({ selectedUser }) => {
    if (!selectedUser) {
        return (
            <div className="h-20 bg-gray-300 p-4 flex items-center justify-center">
                Sélectionnez un utilisateur pour démarrer une conversation
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-4 border-b rounded-tr-lg h-20 bg-gray-300">
            <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                    <AvatarImage
                        src={selectedUser.photo}
                        alt={selectedUser.name}
                    />
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{selectedUser.name}</span>
                    <span className="text-xs">Active 2 mins ago</span>
                </div>
            </div>
            <div className="flex gap-2">
                {topbarIcons.map(({ icon: Icon }, index) => (
                    <button
                        key={index}
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'w-9 h-9'
                        )}
                    >
                        <Icon size={20} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatTopbar;
