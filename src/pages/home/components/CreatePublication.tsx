import {
    useMutation,
    useQueryClient,
    UseMutationResult
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, ImageDown, File } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EmojiPicker } from '@/components/emoji-picker';

type Publication = {
    id?: number;
    user_id: number;
    user_name: string;
    reaction: string;
    description: string;
    creation_date: string;
    creation_time: string;
    photo_url: string;
    comment: string;
};

export default function CreatePublication() {
    const [description, setDescription] = useState<string>('');
    const [photo_url, setPhotoUrl] = useState<string>('');
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedName = localStorage.getItem('userName') || undefined;
        const storedId = localStorage.getItem('userId');
        setUserName(storedName);
        setUserId(storedId ? parseInt(storedId) : undefined);
    }, []);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const mutation: UseMutationResult<
        AxiosResponse<Publication>,
        Error,
        Partial<Publication>
    > = useMutation({
        mutationFn: async (newPublication: Partial<Publication>) => {
            return axios.post<Publication>(
                `${baseUrl}/publications`,
                newPublication
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['publications']
            });
            setDescription('');
            setPhotoUrl('');
        },
        onError: (error) => {
            console.error('Error creating publication:', error);
        }
    });

    const handleSubmit = () => {
        if (!description || !userName || userId === undefined) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        const newPublication: Partial<Publication> = {
            description,
            user_name: userName,
            user_id: userId,
            reaction: '',
            creation_date: new Date().toISOString().split('T')[0],
            creation_time: new Date().toLocaleTimeString(),
            photo_url,
            comment: ''
        };

        mutation.mutate(newPublication);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mx-auto secondary shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create a Publication</h2>
            <div className="relative flex-grow">
                <Textarea
                    placeholder="What's on your mind?"
                    className="mb-4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="absolute right-2 bottom-1">
                    <EmojiPicker
                        onChange={(value) =>
                            setDescription((prev) => prev + value)
                        }
                    />
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 third"
                >
                    <Send className="w-4 h-4" />
                    Post
                </Button>
                <Button className="flex items-center gap-2 third">
                    <ImageDown className="w-4 h-4" />
                    Upload Image
                </Button>
                <Button className="flex items-center gap-2 third">
                    <File className="w-4 h-4" />
                    Upload File
                </Button>
            </div>
            {mutation.isError && (
                <div className="text-red-500">Error creating publication!</div>
            )}
        </div>
    );
}
