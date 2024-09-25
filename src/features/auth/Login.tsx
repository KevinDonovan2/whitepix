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
import { toast } from 'react-hot-toast'; // Importer le toast

// Schéma de validation Zod
const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' }) // Message personnalisé pour l'email
        .nonempty({ message: 'Email is required' }), // Ajouter une validation pour email vide
    password: z.string().nonempty({ message: 'Password is required' }) // Message pour le mot de passe vide
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

    // Fonction exécutée lors du clic sur le bouton de login
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post(
                'http://localhost:8081/users/login',
                data
            );
            console.log('Login successful:', response.data);

            // Stocker le token, l'heure de connexion, le nom, la photo et l'ID de l'utilisateur
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('loginTime', new Date().getTime().toString());
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userPhoto', response.data.user.photo); // Stocker la photo de l'utilisateur
            localStorage.setItem('userId', response.data.user.id); // Stocker l'ID de l'utilisateur

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

    // Fonction exécutée lors du clic sur le bouton
    const handleLoginClick = async () => {
        // Validation manuelle avant l'envoi
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
                        onClick={handleLoginClick} // Déclenche la validation avant l'envoi
                    >
                        Login
                    </Button>
                    <Button
                        className="w-full font-bold"
                        type="button"
                        onClick={handleSignUpClick}
                    >
                        Sign up with Google
                    </Button>
                    <div>
                        Need an account? Create one
                        <a href="/signup" className="text-blue-500">
                            {' '}
                            sign up
                        </a>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}

export default Login;
