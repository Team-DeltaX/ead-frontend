describe('Admin Orders Showing', () => {
    beforeEach(() => {
      cy.intercept('GET', 'http://localhost:8080/api/v1/orders', { fixture: 'mockOrders.json' }).as('getOrders');
  
      cy.visit('http://localhost:3000/');
  
      cy.get('button[data-cy="open-login-dialog"]').click();
      cy.get('input[name="email"]').type('admin@gmail.com');
      cy.get('input[name="password"]').type('admin1234');
      cy.get('button[type="submit"]').click();
  
      cy.get('[data-cy="link-admin-orders"]').click(); // Adjust selector if necessary
  
      cy.wait('@getOrders');
    });
  
    it('should display the list of orders fetched from the API', () => {
      cy.get('tbody tr').should('have.length.at.least', 1); 
    });
  
    it('should display correct order details for the first order', () => {
     
      cy.get('[data-cy="order-date-2"]').should('contain', '2024-11-29');
  
    
      cy.get('[data-cy="order-user-2"]').should('contain', 'Godage Sasindu');
  
     
      cy.get('[data-cy="order-items-2"]').should('contain', 'Apple iPhone 14');
  
    
    });
  });
  