describe('UI Rendering Tests', () => {
  
    it('should render the "Browse By Category" section', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Browse By Category').should('be.visible');
      cy.contains('Explore items by category and find your favorites').should('be.visible');
    });
  
    it('should render the "New Arrivals" section', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('New Arrivals').should('be.visible');
      cy.contains('Say hello to our newest collection').should('be.visible');
    });
  
    it('should render all categories', () => {
      cy.visit('http://localhost:3000/');
      cy.get('[data-testid="categoryitem"]').should('have.length', 5);
    });
  });
  