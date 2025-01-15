import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback
} from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatBottombar from '@/components/chat/ChatBottombar';
import ChatTopbar from '@/components/chat/ChatTopbar';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(`${baseUrl}`);

interface Message {
    id: number;
    user_id_source: string;
    user_id_destinataire: string;
    message: string;
    created_at: string;
}

interface User {
    id: string;
    name: string;
    photo: string;
}

const ChatTest: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [lastMessages, setLastMessages] = useState<{
        [key: string]: Message;
    }>({});
    const [userId2, setUserId2] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const userId1 = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const axiosConfig = useMemo(
        () => ({
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        [token]
    );

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const isMobile = useIsMobile();

    const updateLastMessages = useCallback(
        (newMessages: Message[]) => {
            const lastMessageMap: { [key: string]: Message } = {
                ...lastMessages
            };

            newMessages.forEach((msg) => {
                const userId =
                    msg.user_id_source === userId1
                        ? msg.user_id_destinataire
                        : msg.user_id_source;
                lastMessageMap[userId] = msg;
            });

            setLastMessages(lastMessageMap);
        },
        [lastMessages, userId1]
    );

    const updateLastMessage = useCallback(
        (message: Message) => {
            const userId =
                message.user_id_source === userId1
                    ? message.user_id_destinataire
                    : message.user_id_source;
            setLastMessages((prevLastMessages) => ({
                ...prevLastMessages,
                [userId]: message
            }));
        },
        [userId1]
    );

    useEffect(() => {
        if (token) {
            axios
                .get(`${baseUrl}/users`, axiosConfig)
                .then((response) => {
                    const filteredUsers = response.data.filter(
                        (user: User) => user.id !== userId1
                    );
                    setUsers(filteredUsers);
                })
                .catch((error) =>
                    console.error(
                        'Erreur lors de la récupération des utilisateurs:',
                        error
                    )
                );
        }
    }, [token, userId1, axiosConfig]);

    useEffect(() => {
        if (userId2 && token) {
            axios
                .get(`${baseUrl}/messages/conversation`, {
                    ...axiosConfig,
                    params: { userId1, userId2 }
                })
                .then((response) => {
                    setMessages(response.data);
                    updateLastMessages(response.data);
                })
                .catch((error) =>
                    console.error(
                        'Erreur lors du chargement des messages:',
                        error
                    )
                );

            socket.emit('joinConversation', { userId1, userId2 });
        }
    }, [userId1, userId2, token, axiosConfig, updateLastMessages]);

    useEffect(() => {
        socket.on('receiveMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            updateLastMessage(message);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [updateLastMessage]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (newMessage: Message) => {
        if (!newMessage.message || !userId2) return;

        const messageData = {
            userIdSource: userId1,
            userIdDestinataire: userId2,
            message: newMessage.message
        };

        const tempMessage: Message = {
            id: Date.now(),
            user_id_source: userId1!,
            user_id_destinataire: userId2,
            message: newMessage.message,
            created_at: new Date().toISOString()
        };

        setMessages((prevMessages) => [...prevMessages, tempMessage]);
        updateLastMessage(tempMessage);

        axios
            .post(`${baseUrl}/messages`, messageData, axiosConfig)
            .then((response) => {
                socket.emit('sendMessage', response.data);
            })
            .catch((error) =>
                console.error("Erreur lors de l'envoi du message:", error)
            );
    };

    const selectUser = (userId: string) => {
        setUserId2(userId);
        setMessages([]);
        const selected = users.find((user) => user.id === userId) || null;
        setSelectedUser(selected);
    };

    const getLastMessageForUser = (userId: string) => {
        if (lastMessages[userId]) {
            return lastMessages[userId].message;
        }
        return 'Pas de message';
    };

    return (
        <div className="flex h-[80vh]">
            <div className="w-1/4 bg-white p-4 rounded-l-lg">
                <h2 className="text-lg font-semibold mb-4">Users</h2>
                <ul className="flex flex-col gap-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={`flex flex-col items-start p-2 cursor-pointer rounded-lg ${userId2 === user.id ? 'bg-blue-300' : 'bg-gray-100'}`}
                            onClick={() => selectUser(user.id)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={
                                        user.photo ||
                                        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                                    }
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div className="flex flex-col">
                                    <span>{user.name}</span>
                                    <span className="text-sm text-gray-500">
                                        {getLastMessageForUser(user.id)}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-grow flex flex-col rounded-r-lg">
                {selectedUser && <ChatTopbar selectedUser={selectedUser} />}
                <div className="flex-grow overflow-y-auto bg-red-200 p-4 shadow-lg">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-2 p-2 ${msg.user_id_source === userId2 ? 'justify-start' : 'justify-end'}`}
                        >
                            {msg.user_id_source === userId2 && (
                                <img
                                    src={
                                        users.find(
                                            (user) =>
                                                user.id === msg.user_id_source
                                        )?.photo ||
                                        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                                    }
                                    alt={
                                        users.find(
                                            (user) =>
                                                user.id === msg.user_id_source
                                        )?.name
                                    }
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div
                                className={`p-2 max-w-80 rounded-lg ${msg.user_id_source === userId2 ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}
                            >
                                <p>{msg.message}</p>
                                <span className="text-xs text-gray-500">
                                    {new Date(
                                        msg.created_at
                                    ).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
            </div>
        </div>
    );
};

export default ChatTest;
