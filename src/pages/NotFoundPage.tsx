import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600">Page Not Found</p>
            <Link to="/home" className="mt-4 text-blue-500 hover:underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
