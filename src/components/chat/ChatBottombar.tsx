import { useState, useRef } from 'react';
import { EmojiPicker } from '../emoji-picker';
import { PlusCircle, SendHorizontal, ThumbsUp } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';

interface Message {
    id: number;
    user_id_source: string;
    user_id_destinataire: string;
    message: string;
    created_at: string;
}

interface ChatBottombarProps {
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
}

export default function ChatBottombar({
    sendMessage,
    isMobile
}: ChatBottombarProps) {
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage: Message = {
                id: Date.now(),
                user_id_source: localStorage.getItem('userId') || '',
                user_id_destinataire: 'destination_user_id',
                message: message.trim(),
                created_at: new Date().toISOString()
            };
            sendMessage(newMessage);
            setMessage('');
            inputRef.current?.focus();
        }
    };

    return (
        <div className="flex items-center p-2 gap-2 bg-gray-200 rounded-b-lg ">
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                            buttonVariants({ variant: 'ghost', size: 'icon' }),
                            'w-9 h-9'
                        )}
                    >
                        <PlusCircle size={20} />
                    </button>
                </PopoverTrigger>
                <PopoverContent side="top" className="p-2">
                    {message.trim() || isMobile ? (
                        <div className="flex gap-2">
                            <button
                                className={cn(
                                    buttonVariants({
                                        variant: 'ghost',
                                        size: 'icon'
                                    }),
                                    'w-9 h-9'
                                )}
                            >
                                <ThumbsUp size={20} />
                            </button>
                        </div>
                    ) : null}
                </PopoverContent>
            </Popover>

            <div className="relative flex-grow">
                <input
                    type="text"
                    value={message}
                    ref={inputRef}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="your text here..."
                    className="w-full border rounded-full p-2 bg-background h-10"
                />
                <div className="absolute right-2 bottom-1">
                    <EmojiPicker
                        onChange={(value) => setMessage((prev) => prev + value)}
                    />
                </div>
            </div>

            {message.trim() ? (
                <button
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'w-9 h-9'
                    )}
                    onClick={handleSend}
                >
                    <SendHorizontal size={20} />
                </button>
            ) : (
                <button
                    className={cn(
                        buttonVariants({ variant: 'ghost', size: 'icon' }),
                        'w-9 h-9'
                    )}
                    onClick={() =>
                        sendMessage({
                            id: Date.now(),
                            user_id_source:
                                localStorage.getItem('userId') || '',
                            user_id_destinataire: 'destination_user_id',
                            message: '👍',
                            created_at: new Date().toISOString()
                        })
                    }
                >
                    <ThumbsUp size={20} />
                </button>
            )}
        </div>
    );
}
