import React from 'react';
import ChatTopbar from './ChatTopbar';
import { ChatList } from './ChatList';
import { Message, UserData } from './data';

interface ChatProps {
    messages?: Message[];
    selectedUser: UserData;
    isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
    const [messagesState, setMessages] = React.useState<Message[]>(
        messages ?? []
    );

    const sendMessage = (newMessage: Message) => {
        setMessages([...messagesState, newMessage]);
    };

    return (
        <div className="relative flex flex-col w-full h-[80vh]">
            <div className="w-full z-10">
                <ChatTopbar selectedUser={selectedUser} />
            </div>
            <div className="flex-1 overflow-y-auto">
                <ChatList
                    messages={messagesState}
                    selectedUser={selectedUser}
                    sendMessage={sendMessage}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
}

//fix user use localStorage for send message
// other user for receve message
// List of user for message (pour l'instant ' select * from user ')
