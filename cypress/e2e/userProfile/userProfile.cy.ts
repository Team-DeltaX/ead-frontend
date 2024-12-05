/// <reference types="cypress" />

describe('Profile Details Functionality', () => {
  beforeEach(() => {
    
    // Visit the homepage and log in
    cy.visit('http://localhost:3000/');
    cy.get('button[data-cy="open-login-dialog"]').click();

    // Valid login credentials
    cy.get('input[name="email"]').type('chathuraishara63@gmail.com');
    cy.get('input[name="password"]').type('Morait2020@');
    cy.get('button[type="submit"]').click();

    // Navigate to the profile page
    cy.get('[data-cy="profileicon"]').click();

  });

  it('Profile page should be displayed correctly', () => {
    // Check if the page contains "User Details" heading
    cy.contains('User Details').should('be.visible');
    // Check if the page contains "Order Details" heading
    cy.contains('Order Details').should('be.visible');
  });

  it('Displays user details correctly', () => {
    // Verify the user details are displayed correctly
    cy.get('label[for="name"]').contains('First Name').should('contain.text', 'chathura'); 
    cy.get('label[for="name"]').contains('Last Name').should('contain.text', 'ishara'); 
    cy.get('label[for="name"]').contains('E-mail').should('contain.text', 'chathuraishara63@gmail.com'); 
    cy.get('label[for="name"]').contains('Phone').should('contain.text', '0774733245'); 
    cy.get('label[for="name"]').contains('Address').should('contain.text', ''); 
  });
});
