// cypress/e2e/signup.cy.js

describe('Sign Up Page E2E Test', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should successfully sign up a new user', () => {
        cy.get('#email').type('donovan@gmail.com');
        cy.get('#password').type('12345678D');
        cy.get('[type="submit"]').click();
    });
});
