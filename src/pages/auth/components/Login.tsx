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
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .nonempty({ message: 'Email is required' }),
    password: z.string().nonempty({ message: 'Password is required' })
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger // Permet de déclencher manuellement la validation
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.post(
                `${baseUrl}/users/users/login`,
                data
            );
            console.log('Login successful:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loginTime', new Date().getTime().toString());
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userPhoto', response.data.user.photo);
            localStorage.setItem('userId', response.data.user.id);

            toast.success('Login successful!');
            navigate('/home');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    'Login failed:',
                    error.response?.data || error.message
                );
                toast.error(
                    'Failed to authenticate. Please check your credentials.'
                );
            } else {
                console.error('Login failed:', error);
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    const handleLoginClick = async () => {
        const isValid = await trigger();
        if (!isValid) {
            toast.error('Please fix the errors before submitting.');
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <Card className="w-[350px] shadow-xl">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>This is a basic login page</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent>
                    <div className="grid w-full gap-4">
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
                <CardFooter className="flex flex-col gap-4 ">
                    <Button
                        className="w-full font-bold"
                        type="submit"
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Button
                        className="w-full font-bold"
                        type="button"
                        onClick={handleSignUpClick}
                    >
                        Sign up
                    </Button>
                    <div>
                        Need an account? Create one
                        <a href="/signup" className="text-blue-500">
                            {}
                            sign up
                        </a>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}

export default Login;
