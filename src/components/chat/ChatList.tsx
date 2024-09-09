import { useRef, useEffect } from 'react';
import { Message, UserData } from './data';
import { Avatar, AvatarImage } from '../ui/avatar';
import ChatBottombar from './ChatBottombar';

interface ChatListProps {
    messages?: Message[];
    selectedUser: UserData;
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
}

export function ChatList({
    messages,
    selectedUser,
    sendMessage,
    isMobile
}: ChatListProps) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            <div
                className="flex flex-col flex-1 overflow-y-auto z-0"
                ref={messagesContainerRef}
            >
                {messages?.map((message, index) => (
                    <div
                        key={index}
                        className={`bg-red-200 flex items-start gap-3 p-4 ${message.name === selectedUser.name ? 'justify-start' : 'justify-end'}`}
                    >
                        {message.name === selectedUser.name && (
                            <Avatar className="w-10 h-10 shrink-0">
                                <AvatarImage
                                    src={message.avatar}
                                    alt={message.name}
                                />
                            </Avatar>
                        )}
                        <span
                            className={`bg-accent p-3 rounded-md max-w-xs ${
                                message.name === selectedUser.name
                                    ? 'mr-2'
                                    : 'ml-2'
                            }`}
                        >
                            {message.message}
                        </span>
                        {message.name !== selectedUser.name && (
                            <Avatar className="w-10 h-10 shrink-0">
                                <AvatarImage
                                    src={message.avatar}
                                    alt={message.name}
                                />
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
            <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
        </div>
    );
}
