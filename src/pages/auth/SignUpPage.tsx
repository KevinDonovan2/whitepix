import { ModeToggle } from '../../components/mode-toggle';
import SignUp from './components/SignUp';
import { ThemeProvider } from '@/components/theme-provider';

function SignUpPage() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ModeToggle />
            <div className="grid grid-cols-1 justify-content-center mt-4">
                <div className="flex items-center justify-center">
                    <SignUp />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SignUpPage;
