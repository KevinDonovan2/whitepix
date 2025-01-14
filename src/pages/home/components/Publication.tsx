import {
    useQuery,
    UseQueryResult,
    useMutation,
    UseMutationResult,
    useQueryClient
} from '@tanstack/react-query';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Share2,
    MessageCircleMore,
    ThumbsUp,
    Trash2,
    Save
} from 'lucide-react';

type Publication = {
    id: number;
    user_id: number;
    user_name: string;
    user_photo?: string;
    reaction: string;
    description: string;
    creation_date: string;
    creation_time: number;
    photo_url?: string;
    comment: string;
};

type FetchPublicationsResponse = Publication[];

async function fetchPublications(): Promise<FetchPublicationsResponse> {
    const response = await axios.get(
        'https://whitepix-api.onrender.com/publications'
    );
    return response.data;
}

async function deletePublication(id: number): Promise<void> {
    await axios.delete(`https://whitepix-api.onrender.com/publications/${id}`);
}

function Publication() {
    const queryClient = useQueryClient();

    const {
        data: publications = [],
        error,
        isLoading
    }: UseQueryResult<FetchPublicationsResponse> = useQuery({
        queryKey: ['publications'],
        queryFn: fetchPublications
    });

    const deleteMutation: UseMutationResult<void, Error, number> = useMutation({
        mutationFn: deletePublication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['publications'] });
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching publications: {error.message}</div>;

    return (
        <div>
            {publications.map((publication) => (
                <Card key={publication.id} className="mx-auto my-4 secondary">
                    <CardHeader className="flex-row items-center container flex justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage
                                    src={
                                        publication.user_photo
                                            ? publication.user_photo
                                            : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                                    }
                                    alt="Profile"
                                />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-lg font-semibold">
                                    {publication.user_name}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground flex flex-row gap-2">
                                    <div>{publication.creation_time}</div>
                                    <div>{publication.creation_date}</div>
                                </CardDescription>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Button
                                className="text-white bg-gray-500 rounded-[50%] flex justify-center items-center p-2 "
                                onClick={() =>
                                    deleteMutation.mutate(publication.id)
                                }
                                disabled={deleteMutation.isPending}
                            >
                                <Save />
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-red-500 bg-gray-200 rounded-[50%] flex justify-center items-center p-2"
                                onClick={() =>
                                    deleteMutation.mutate(publication.id)
                                }
                                disabled={deleteMutation.isPending}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-md">{publication.description}</p>
                        {publication.photo_url && (
                            <img
                                src={publication.photo_url}
                                alt="Publication"
                                className="rounded-md w-full"
                            />
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-around">
                        <Button
                            variant="ghost"
                            className="border third text-white"
                        >
                            <div className="flex flex-row gap-2 ">
                                <ThumbsUp />
                                like
                            </div>
                        </Button>
                        <Button
                            variant="ghost"
                            className="border third text-white"
                        >
                            <div className="flex flex-row gap-2  ">
                                <MessageCircleMore />
                                comment
                            </div>
                        </Button>
                        <Button
                            variant="ghost"
                            className="border third text-white"
                        >
                            <div className="flex flex-row gap-2 ">
                                <Share2 />
                                share
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Publication;
