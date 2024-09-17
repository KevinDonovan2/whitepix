// cypress/e2e/signup.cy.js

describe('Sign Up Page E2E Test', () => {
    beforeEach(() => {
        cy.visit('/signup');
    });

    it('should successfully sign up a new user', () => {
        cy.get('#name').type('bogany');
        cy.get('#email').type('bogosy@gmail.com');
        cy.get('#password').type('12345678D');

        cy.get('[type="submit"]').click();
    });
});
