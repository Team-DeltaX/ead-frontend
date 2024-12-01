/// <reference types="cypress" />

describe('Login Functionality', () => {
    beforeEach(() => {
      // Visit the homepage or wherever the Login Dialog is accessible
      cy.visit('http://localhost:3000/');
    });
  
    it('Should display the login dialog when the login button is clicked', () => {
      // Trigger login dialog open if it's opened by a button
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Assert that the dialog is visible
      cy.get('div[role="dialog"]').should('be.visible');
      cy.contains('LOGIN').should('be.visible');
      cy.contains('Enter your credentials to access your account.').should('be.visible');
    });
  
    it('Should show validation errors for empty form fields', () => {
      // Open the login dialog
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Click the submit button without filling the form
      cy.get('button[type="submit"]').click();
  
      // Assert validation errors are shown
      cy.contains('Invalid email address').should('be.visible');
      cy.contains('Password must be at least 8 characters').should('be.visible');
    });
  
    it('Should show validation error for invalid email format', () => {
      // Open the login dialog
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Enter invalid email
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert validation error
      cy.contains('Invalid email address').should('be.visible');
    });
  
    it('Should log in successfully with valid credentials', () => {
      // Mock valid credentials
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          data: {
            token: 'mock-token',
            user: { email: 'johndoe@gmail.com', name: 'John Doe' },
            role: 'admin',
          },
        },
      }).as('loginRequest');
  
      // Open the login dialog
      cy.get('button[data-cy="open-login-dialog"]').click();

    
      // Fill in valid credentials
      cy.get('input[name="email"]').type('chathuraishara63@gmail.com');
      cy.get('input[name="password"]').type('Morait2020@');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
                   // Assert that the status code is 200 (success)


    // Optional: Check if a success message is displayed after login
    cy.contains('Logged in successfully!').should('be.visible');
  
    });
  
  
    it('Should open the reset password dialog when clicking "Reset Password"', () => {
      // Open the login dialog
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Click on reset password link
      cy.contains('Reset Password').click();
  
      // Assert reset password dialog is opened
      cy.get('div[role="dialog"]').contains('Send OTP').should('be.visible');
    });
  });
  