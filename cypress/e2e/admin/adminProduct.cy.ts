describe('Admin Products Management', () => {
  beforeEach(() => {
    // Mocking the GET request to fetch products with fixture data
    cy.intercept('GET', 'http://localhost:8080/api/v1/products', { fixture: 'mockProducts.json' }).as('getProducts');

    // Mock login and navigate to Admin Products Page
    cy.visit('http://localhost:3000/');
    cy.get('button[data-cy="open-login-dialog"]').click();
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="link-admin-products"]').click();
    cy.wait('@getProducts');
  });

  it('should display the list of products', () => {
    cy.get('tbody tr').should('have.length.at.least', 1);
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('td').should('have.length.at.least', 3); // Check each row has at least 3 columns
    });
  });

  it('should display product details correctly', () => {
    cy.get('tbody tr').first().within(() => {
      cy.get('td').eq(0).should('contain.text', 'Calculator'); 
      cy.get('td').eq(1).should('contain.text', 'Electronics');
    });
  });

 

  // it('should display error message if product list fails to load', () => {
  //   cy.intercept('GET', 'http://localhost:8080/api/v1/products', {
  //     statusCode: 500,
  //     body: { message: 'Failed to load products' },
  //   }).as('getProductsError');

  //   cy.visit('http://localhost:3000/');
  //   cy.get('button[data-cy="open-login-dialog"]').click();
  //   cy.get('input[name="email"]').type('admin@gmail.com');
  //   cy.get('input[name="password"]').type('admin1234');
  //   cy.get('button[type="submit"]').click();
  //   cy.get('[data-cy="link-admin-products"]').click();
  //   cy.wait('@getProductsError');

  //   cy.get('.error-message').should('contain.text', 'Failed to load products');
  // });

  // it('should filter products based on category', () => {
  //   cy.get('input[data-cy="filter-category"]').type('Electronics');
  //   cy.get('tbody tr').should('have.length', 1); // Assuming only one product matches the filter
  //   cy.get('tbody tr td').eq(1).should('contain.text', 'Calculator');
  // });

  // it('should display pagination controls and navigate between pages', () => {
  //   // Assuming there are multiple pages, mock data for pagination
  //   cy.intercept('GET', 'http://localhost:8080/api/v1/products?page=2', {
  //     fixture: 'mockProductsPage2.json',
  //   }).as('getProductsPage2');

  //   cy.get('button[data-cy="pagination-next"]').click();
  //   cy.wait('@getProductsPage2');
  //   cy.get('tbody tr').should('have.length.at.least', 1); // Products from page 2
  // });

  // it('should display correct total number of products', () => {
  //   cy.get('div[data-cy="total-products"]').should('contain.text', 'Total Products: 3'); // Adjust based on fixture data
  // });
});
