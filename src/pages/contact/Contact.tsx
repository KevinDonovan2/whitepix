import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function Contact() {
    return (
        <Card className="w-full">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center mb-4">
                    Contact Us
                </h1>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium"
                        >
                            Message
                        </label>
                        <Textarea
                            id="message"
                            placeholder="Your message..."
                            className="mt-1"
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
