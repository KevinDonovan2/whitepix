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
import {MessageCircleMore } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';

function Publication() {
    return (
        <Card className="w-full max-w-md mx-auto my-4">
            <CardHeader className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg font-semibold">
                        John Doe
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        2 hours ago
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-md">
                    Here's a simple post with some text content. Check out this
                    cool image below!
                </p>
                <img
                    src="https://via.placeholder.com/300"
                    alt="Post Content"
                    className="rounded-md w-full"
                />
            </CardContent>
            <CardFooter className="flex justify-around">
                <Button variant="ghost" className='border'>
                    <div className='flex flex-row gap-2 '>
                        <ThumbsUp />Like
                    </div>
                </Button>
                <Button variant="ghost" className='border'>
                    <div className='flex flex-row gap-2  '>
                    <MessageCircleMore />Comment
                    </div>
                </Button>
                <Button variant="ghost" className='border'>
                    <div className='flex flex-row gap-2 '>
                        <Share2 />Share
                    </div>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Publication;
