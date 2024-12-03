/// <reference types="cypress" />

describe('Login Functionality', () => {
    beforeEach(() => {
     
      cy.visit('http://localhost:3000/');
    });
  
    it('Should display the login dialog when the login button is clicked', () => {
      
      cy.get('button[data-cy="open-login-dialog"]').click();
  
    
      cy.get('div[role="dialog"]').should('be.visible');
      cy.contains('LOGIN').should('be.visible');
      cy.contains('Enter your credentials to access your account.').should('be.visible');
    });
  
    it('Should show validation errors for empty form fields', () => {
     
      cy.get('button[data-cy="open-login-dialog"]').click();
  
    
      cy.get('button[type="submit"]').click();
  
    
      cy.contains('Invalid email address').should('be.visible');
      cy.contains('Password must be at least 8 characters').should('be.visible');
    });
  
    it('Should show validation error for invalid email format', () => {
    
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // invalid email
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('password123');
  
     
      cy.get('button[type="submit"]').click();
  
     
      cy.contains('Invalid email address').should('be.visible');
    });
  
    it('Should log in successfully with valid credentials', () => {
    
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
  
    
      cy.get('button[data-cy="open-login-dialog"]').click();

    
      // valid credentials
      cy.get('input[name="email"]').type('chathuraishara63@gmail.com');
      cy.get('input[name="password"]').type('Morait2020@');
  
     
      cy.get('button[type="submit"]').click();
                  


 
    cy.contains('Logged in successfully!').should('be.visible');
  
    });
  
  
    it('Should open the reset password dialog when clicking "Reset Password"', () => {
    
      cy.get('button[data-cy="open-login-dialog"]').click();
  
    
      cy.contains('Reset Password').click();
   
      cy.get('div[role="dialog"]').contains('Send OTP').should('be.visible');
    });
  });
  