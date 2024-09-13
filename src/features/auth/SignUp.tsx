import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Définir le schéma de validation avec Zod
const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .regex(/[A-Z]/, {
            message: 'Password must contain at least one uppercase letter'
        })
        .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
});

type SignUpFormData = z.infer<typeof signUpSchema>;

function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const response = await axios.post('http://localhost:8081/users', {
                name: data.name,
                email: data.email,
                password: data.password
            });
            console.log('Sign up successful:', response.data);
            navigate('/home');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    'Sign up failed:',
                    error.response?.data || error.message
                );
            } else {
                console.error('Sign up failed:', error);
            }
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>This is a basic sign up page</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="grid w-full gap-4">
                        <div className="flex flex-col items-start space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Name"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-start space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">
                        Sign up
                    </Button>
                    <Button
                        className="w-full"
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        Login
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default SignUp;
