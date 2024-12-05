import 'cypress-file-upload';
describe('Admin Products Management', () => {
  beforeEach(() => {
  
    cy.intercept('GET', 'http://localhost:8080/api/v1/products', { fixture: 'mockProducts.json' }).as('getProducts');

    
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

    it('should open the update dialog and pre-fill the product details', () => {
      cy.get('tbody tr').first().within(() => {
        cy.get('button[data-cy="update-product-btn"]').click(); // Click update button for first product
      });

    
      cy.get('input[name="productName"]').should('have.value', 'Calculator');
      cy.get('input[name="productPrice"]').should('have.value', '544'); 
      cy.get('input[name="quantity"]').should('have.value', '70');
    });

    it('should display the correct products when a search term is entered', () => {
      
      cy.get('tbody tr').should('have.length.at.least', 1);

      // Search for a product by name (e.g., 'Calculator')
      cy.get('input[placeholder="Search products by name or category ..."]')
        .clear()
        .type('Calculator');

      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(0).should('contain.text', 'Calculator');
      });

      cy.get('input[placeholder="Search products by name or category ..."]').clear();
      cy.get('tbody tr').should('have.length.at.least', 1);
    });

    it('should display "No products found" for a non-existent product search', () => {
      // Enter a search term that does not match any product
      cy.get('input[placeholder="Search products by name or category ..."]')
        .clear()
        .type('NonExistentProduct');

      // Verify that the "No products found" message is displayed
      cy.get('tbody').contains('No products found');
    });

    it('should search by category and display matching products', () => {
      // Search for a product by category (e.g., 'Electronics')
      cy.get('input[placeholder="Search products by name or category ..."]')
        .clear()
        .type('Electronics');

      // Verify the displayed product matches the search term in the category column
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).find('td').eq(1).should('contain.text', 'Electronics');
      });
    });

    it('should update product details correctly', () => {
      cy.intercept('PUT', 'http://localhost:8080/api/v1/products/1', {
        statusCode: 200,
        body: {
          id: 1,
          productName: 'Updated Calculator',
          productPrice: '600.00',
          inventory: 35,
          category: { id: 1, name: 'Electronics' }
        }
      }).as('updateProduct');

    
      cy.get('tbody tr').first().within(() => {
        cy.get('button[data-cy="update-product-btn"]').click(); // Click update button for first product
      });
    

    
      cy.get('input[name="productName"]').clear().type('Updated Calculator');
      cy.get('input[name="productPrice"]').clear().type('600.00');
      cy.get('input[name="quantity"]').clear().type('35');
      
      // Submit the form
      cy.get('button[type="submit"]').click();

      cy.get('[data-cy="alert-continue"]').click();
    
      cy.wait('@updateProduct');  //this gives next js chunk errror

    
     //cy.get('.success-message').should('contain.text', 'Product updated successfully');
    });

  it('should add a new product successfully', () => {
    // Mock the POST request for adding a new product
    cy.intercept('POST', 'http://localhost:8080/api/v1/products', {
      statusCode: 201,
      body: {
        id: 4,
        productName: 'New Product',
        productPrice: '1200.00',
        inventory: 10,
        category: { id: 2, name: 'Accessories' }
      }
    }).as('addProduct');

    // Open the 'Add New Product' dialog
    cy.get('button[data-cy="add-new-product-btn"]').click();

    // Fill out the product form
    cy.get('input[name="productName"]').type('New Product');
    cy.get('input[name="productPrice"]').type('1200.00');
    cy.get('input[name="quantity"]').type('10');
    cy.get('[data-cy="category-select-trigger"]').click();  // Open the dropdown
    cy.get('[role="option"]').contains('Electronics').click();
    cy.get('input[name="brandname"]').type('testbrand');

    cy.get('input[name="description"]').type('test descripion', { force: true });


    cy.get('input[type="file"]').attachFile('test.jpg'); // Correct 


    cy.get('[data-cy="add-product-button"]').click();
    cy.get('[data-cy="success-toast"]')
    .should('be.visible')
    .and('contain.text', 'Product added successfully!');


   
  });


  it('should open the add category dialog', () => {
    cy.get('[data-cy="add-category-btn"]').click(); 
    cy.get('[data-cy="category-name-input"]').should('be.visible'); 
  });

  it('should add a new category successfully', () => {
    cy.intercept('POST', 'http://localhost:8080/api/v1/categories', {
      statusCode: 201,
      body: {
        id: 3,
        name: 'New Category',
        description: 'Description of new category',
      },
    }).as('addCategory');

   
    cy.get('[data-cy="add-category-btn"]').click();

    cy.get('[data-cy="category-name-input"]').type('New Category');

    cy.get('[data-cy="add-category-submit"]').click();

    cy.get('[data-cy="alert-continue"]:visible').click(); 

    
  });

 


 

 


});
