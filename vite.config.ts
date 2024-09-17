import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 5173, // Assurez-vous que le port est bien défini et disponible
        open: true // Ouvrir automatiquement le navigateur à l'adresse spécifiée
    }
});
