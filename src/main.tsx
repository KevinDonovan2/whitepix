import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import HomePage from './pages/home/HomePage';
import './index.css';
import ChatPage from './pages/chat/ChatPage';
import PrivateRoute from './features/auth/PrivateRoute'; 
import NotFoundPage from './pages/NotFoundPage';

const queryClient = new QueryClient();

const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    },
    {
        element: <PrivateRoute />, 
        children: [
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/chat',
                element: <ChatPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={ROUTER} />
        </QueryClientProvider>
    </React.StrictMode>
);
