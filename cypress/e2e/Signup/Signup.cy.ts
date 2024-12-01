describe('Login Dialog Navigation', () => {
    it('should navigate to the Registration form when clicking "Register"', () => {
      cy.visit('http://localhost:3000');
       cy.get('button').contains('LOGIN').click();
      cy.get('a').contains('Register').click();   
      cy.url().should('include', '/auth');
      cy.contains('REGISTER').should('be.visible');
    });
  });
  