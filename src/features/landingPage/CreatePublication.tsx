import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';

type Publication = {
    id?: number;
    user_name: string | undefined;
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
    const [userName, setUserName] = useState<string | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        setUserName(storedName);
    });

    const mutation = useMutation({
        mutationFn: async (newPublication: Partial<Publication>) => {
            return axios.post(
                'http://localhost:8081/publications',
                newPublication
            );
        },
        onSuccess: () => {
            // Invalide les publications existantes pour déclencher un refetch
            queryClient.invalidateQueries({
                queryKey: ['publications']
            });
        }
    });

    const handleSubmit = () => {
        const newPublication: Partial<Publication> = {
            description,
            user_name: userName,
            reaction: '',
            creation_date: new Date().toISOString().split('T')[0],
            creation_time: new Date().toLocaleTimeString(),
            photo_url,
            comment: ''
        };

        mutation.mutate(newPublication);
        setDescription('');
        setPhotoUrl('');
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mx-auto secondary ">
            <h2 className="text-lg font-semibold mb-4">Create a Publication</h2>
            <Textarea
                placeholder="What's on your mind?"
                className="mb-4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Button
                onClick={handleSubmit}
                className="flex items-center gap-2 third"
            >
                <Send className="w-4 h-4" />
                Post
            </Button>
        </div>
    );
}
