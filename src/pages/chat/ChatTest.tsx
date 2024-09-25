import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatBottombar from '@/components/chat/ChatBottombar';
import ChatTopbar from '@/components/chat/ChatTopbar'; // Importation du ChatTopbar

const socket = io('http://localhost:8081');

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
    const [userId2, setUserId2] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Nouvel état pour l'utilisateur sélectionné
    const userId1 = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (token) {
            axios
                .get('http://localhost:8081/users', axiosConfig)
                .then((response) => {
                    const filteredUsers = response.data.filter(
                        (user: User) => user.id !== userId1
                    );
                    setUsers(filteredUsers);
                })
                .catch((error) =>
                    console.error('Erreur lors de la récupération des utilisateurs:', error)
                );
        }
    }, [token, userId1]);

    useEffect(() => {
        if (userId2 && token) {
            axios
                .get('http://localhost:8081/messages/conversation', {
                    ...axiosConfig,
                    params: { userId1, userId2 }
                })
                .then((response) => setMessages(response.data))
                .catch((error) =>
                    console.error('Erreur lors du chargement des messages:', error)
                );

            socket.emit('joinConversation', { userId1, userId2 });
        }
    }, [userId1, userId2, token]);

    useEffect(() => {
        socket.on('receiveMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

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

        axios
            .post('http://localhost:8081/messages', messageData, axiosConfig)
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
        setSelectedUser(selected); // Stocker l'utilisateur sélectionné
    };

    return (
        <div className="flex h-[80vh]">
            <div className="w-1/4 bg-white p-4 rounded-l-lg">
                <h2 className="text-lg font-semibold mb-4">Utilisateurs</h2>
                <ul className="flex flex-col gap-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className={`flex items-center p-2 cursor-pointer rounded-lg ${userId2 === user.id ? 'bg-blue-300' : 'bg-gray-100'}`}
                            onClick={() => selectUser(user.id)}
                        >
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <span>{user.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-grow flex flex-col rounded-r-lg">
                {selectedUser && <ChatTopbar selectedUser={selectedUser} />} {/* Affichage du ChatTopbar */}
                <div className="flex-grow overflow-y-auto bg-red-200 p-4 shadow-lg">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start gap-2 p-2 ${msg.user_id_source === userId2 ? 'justify-start' : 'justify-end'}`}
                        >
                            {msg.user_id_source !== userId1 && (
                                <img
                                    src={
                                        users.find(
                                            (user) =>
                                                user.id === msg.user_id_source
                                        )?.photo
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
                                className={`p-2 rounded-lg ${msg.user_id_source === userId2 ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`}
                            >
                                <p>{msg.message}</p>
                                <span className="text-xs text-gray-500">
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                            {msg.user_id_source === userId1 && (
                                <img
                                    src={
                                        users.find((user) => user.id === userId2)?.photo
                                    }
                                    alt={
                                        users.find((user) => user.id === userId2)?.name
                                    }
                                    className="w-8 h-8 rounded-full ml-2"
                                />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <ChatBottombar sendMessage={sendMessage} isMobile={false} />
            </div>
        </div>
    );
};

export default ChatTest;
