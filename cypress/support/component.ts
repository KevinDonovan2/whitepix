// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';

// Augment Cypress with custom command types without using namespaces
interface CustomCommands {
    mount: typeof mount;
}

// Merge the custom commands into Cypress’ Chainable interface
declare module 'cypress' {
    interface Chainable extends CustomCommands {}
}

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
