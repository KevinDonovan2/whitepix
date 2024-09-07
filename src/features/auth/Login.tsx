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

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post(
                'http://localhost:8081/users/login',
                data
            );
            console.log('Login successful:', response.data);

            // Stocker le token et l'heure de connexion
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loginTime', new Date().getTime().toString()); // Enregistre l'heure en millisecondes

            navigate('/home');
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(
                    'Login failed:',
                    error.response?.data || error.message
                );
            } else {
                console.error('Login failed:', error);
            }
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <Card className="w-[350px]">
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
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                    <Button
                        className="w-full"
                        type="button"
                        onClick={handleSignUpClick}
                    >
                        Sign up
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

export default Login;
