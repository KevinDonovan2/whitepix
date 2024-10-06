import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SendEmail from './components/SendEmail';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(1, 'Message is required')
});

type ContactFormData = z.infer<typeof schema>;

export default function Contact() {
    const { control, handleSubmit, reset } = useForm<ContactFormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log('Form data:', data);
        try {
            await SendEmail(data);
            alert('Message sent successfully');
            reset();
        } catch (error) {
            console.error('Error occurred:', error);
            alert('An error occurred');
        }
    };

    return (
        <Card className="w-full flex flex-row">
            <div>
                <img
                    src="image.jpg"
                    className="w-full h-[80vh] overflow-hidden rounded-l-lg"
                    alt=""
                />
            </div>
            <div className="w-1/2 mx-auto p-6 ">
                <h1 className="text-3xl font-bold text-center ">Contact Us</h1>
                <p className="text-sm text-muted-foreground text-center mb-4">
                    If you have a reclamation or something like that text here
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    className="mt-1"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="mt-1"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium"
                        >
                            Message
                        </label>
                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    id="message"
                                    placeholder="Your message..."
                                    className="mt-1"
                                />
                            )}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-full md:w-auto">
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
