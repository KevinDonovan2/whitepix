import React, { useEffect, useState } from 'react';
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
import { Share2 } from 'lucide-react';
import { MessageCircleMore } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';

type Publication = {
    id: number;
    user_name: string;
    reaction: string;
    description: string;
    creation_date: string;
    creation_time: string;
    photo_url?: string;
    comment: string;
};

function Publication() {
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8080/publications')
            .then(response => {
                setPublications(response.data);
            })
            .catch(error => {
                console.error('Error fetching publications:', error);
            });
    }, []);

    return (
        <div>
            {publications.map((publication) => (
                <Card key={publication.id} className="w-full max-w-md mx-auto my-4">
                    <CardHeader className="flex items-center space-x-4">
                        <div className='flex items-center gap-4'>
                            <Avatar>
                                <AvatarImage
                                    src= "https://via.placeholder.com/40"
                                    alt="User Avatar"
                                />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <CardTitle className="text-lg font-semibold">
                                    {publication.user_name}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    {publication.creation_time}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-md">
                            {publication.description}
                        </p>
                        {publication.photo_url && (
                            <img
                                src={publication.photo_url}
                                alt="Post Content"
                                className="rounded-md w-full"
                            />
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-around">
                        <Button variant="ghost" className='border bg-black text-white'>
                            <div className='flex flex-row gap-2 '>
                                <ThumbsUp />like
                            </div>
                        </Button>
                        <Button variant="ghost" className='border bg-black text-white'>
                            <div className='flex flex-row gap-2  '>
                                <MessageCircleMore />comment
                            </div>
                        </Button>
                        <Button variant="ghost" className='border bg-black text-white'>
                            <div className='flex flex-row gap-2 '>
                                <Share2 />share
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default Publication;
