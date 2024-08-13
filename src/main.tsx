import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import HomePage from './pages/home/HomePage';
import './index.css';

// Crée une instance du QueryClient
const queryClient = new QueryClient();

// Configure les routes
const ROUTER = createBrowserRouter([
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={ROUTER} />
        </QueryClientProvider>
    </React.StrictMode>
);
