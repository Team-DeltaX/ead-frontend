describe('prodct showing', () => {

    beforeEach(() => {
      // Visit the page and perform the login before each test case
      cy.visit('http://localhost:3000/');
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Valid login credentials
      cy.get('input[name="email"]').type('chathuraishara63@gmail.com');    
      cy.get('input[name="password"]').type('Morait2020@');
      cy.get('button[type="submit"]').click();
      cy.get('[data-cy="productbutton"]').click({force: true});
    });
  
    it('should render products correctly from mock data', () => {
        cy.intercept('GET', 'http://localhost:8080/api/v1//products?order=asc&limit=100&offset=0&sortBy=id', { fixture: 'mockProducts.json' }).as('getProducts');
       
      
        // Wait for the API response
        cy.wait('@getProducts');
      
        cy.get('[data-cy="product-card-1"]').should('exist');
        cy.get('[data-cy="product-name-1"]').should('contain.text', 'Product 1');
        cy.get('[data-cy="product-price-1"]').should('contain.text', '$100');
        cy.get('[data-cy="product-category-1"]').should('contain.text', 'Category A');
        
        cy.get('[data-cy="product-card-2"]').should('exist');
        cy.get('[data-cy="product-name-2"]').should('contain.text', 'Product 2');
        cy.get('[data-cy="product-price-2"]').should('contain.text', '$150');
        cy.get('[data-cy="product-category-2"]').should('contain.text', 'Category B');
      });
  
    
  
  });
  