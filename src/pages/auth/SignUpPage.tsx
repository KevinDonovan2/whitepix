import SignUp from './components/SignUp';

function SignUpPage() {
    return (
        <div className="grid grid-cols-1 justify-content-center h-screen primary">
            <div className="flex items-center justify-center">
                <SignUp />
            </div>
        </div>
    );
}

export default SignUpPage;
