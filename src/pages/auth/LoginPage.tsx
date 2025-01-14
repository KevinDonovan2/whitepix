import Login from './components/Login';

function LoginPage() {
    return (
        <div className="grid grid-cols-1 justify-content-center h-screen primary">
            <div className="flex items-center justify-center">
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;
