import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Publication from '../../src/features/landingPage/Publication'; // Assure-toi du chemin correct
import { mount } from 'cypress/react18';

// Créer une instance QueryClient pour les tests
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false // Désactiver les retries dans les tests
            }
        }
    });

describe('Publication Component', () => {
    it('should delete a publication when the delete button is clicked', () => {
        const publications = [
            {
                id: 1,
                user_name: 'John Doe',
                reaction: 'like',
                description: 'This is a test publication',
                creation_date: '2023-09-12',
                creation_time: 123456789,
                photo_url: '',
                comment: 'This is a comment'
            }
        ];

        // Mock la réponse à l'API pour fetchPublications
        cy.intercept('GET', 'http://localhost:8081/publications', {
            statusCode: 200,
            body: publications
        });

        // Mock la suppression (delete) d'une publication
        cy.intercept('DELETE', 'http://localhost:8081/publications/1', {
            statusCode: 200
        }).as('deletePublication');

        // Monte le composant avec QueryClient
        mount(
            <QueryClientProvider client={createTestQueryClient()}>
                <Publication />
            </QueryClientProvider>
        );

        // Vérifie que le composant a bien rendu les publications
        cy.contains('John Doe').should('be.visible');
        cy.contains('This is a test publication').should('be.visible');

        // Simule un clic sur le bouton "Delete"
        cy.get('button').contains('Trash').click();

        // Vérifie que la suppression a été appelée
        cy.wait('@deletePublication')
            .its('response.statusCode')
            .should('eq', 200);

        // Assure-toi que la publication est supprimée après l'appel
        cy.contains('John Doe').should('not.exist');
    });
});
