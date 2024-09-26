import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import HomePage from './pages/home/HomePage';
import './index.css';
import PrivateRoute from './features/auth/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';
import Dashboard from './pages/dashboard/Dashboard';
import ChatPage from './pages/chat/ChatPage';
import ContactPage from './pages/contact/ContactPage';
import FriendPage from './pages/friend/FriendPage';

const queryClient = new QueryClient();

const ROUTER = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/contact',
        element: <ContactPage />
    },
    {
        path: '/friends',
        element: <FriendPage />
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
        //ajouter ici une dynamisme au url , ajouter l'id et nom de l'utilisateur.
        element: <PrivateRoute />,
        children: [
            {
                path: '/home',
                element: <HomePage />
            },
            {
                path: '/chat',
                element: <ChatPage />
            },
            {
                path: '/users',
                element: <Dashboard />
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
