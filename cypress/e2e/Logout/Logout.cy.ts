describe('Logout Functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); 
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
  
    it('should display the logout confirmation dialog', () => {
       
        cy.get('button[data-cy="logoutbutton"]').click();
  
     
      cy.contains('Confirm Logout').should('be.visible');
      cy.contains(
        'Your session will be closed, and you will be redirected to the Home page. Do you wish to continue?'
      ).should('be.visible');
    });
  
    it('should cancel the logout process when "Cancel" is clicked', () => {
        cy.get('button[data-cy="logoutbutton"]').click();
  
      cy.get('button').contains('Cancel').click();
  
     
      cy.get('button[data-cy="logoutbutton"]').click();
    });
  
    it('should log out the user and redirect to home when "Continue" is clicked', () => {
        cy.get('button[data-cy="logoutbutton"]').click();

  
     
      cy.get('button').contains('Continue').click();
  
     
      cy.wait(1000);
  
      cy.url().should('eq', 'http://localhost:3000/');
  
      cy.window().then((win) => {
        const authState = win.localStorage.getItem('authState');
        expect(authState).to.be.null;
      });
  
      
      cy.get('button').contains('LOGIN').should('be.visible');
    });
  });
  