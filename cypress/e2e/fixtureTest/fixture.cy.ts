describe('Dashboard Orders API Mock', () => {
    it('should return mock data for /orders/stat', () => {
      // Intercept the GET request and return fixture data
      cy.intercept('GET', 'http://localhost:8080/api/v1/orders/stat', { fixture: 'mockOrdersStat.json' }).as('getOrdersStat');
  
      cy.visit('http://localhost:3000/');
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Valid login credentials
      cy.get('input[name="email"]').type('admin@gmail.com');
      cy.get('input[name="password"]').type('admin1234');
      cy.get('button[type="submit"]').click();
  
      // Wait for the intercepted request and assert the mock data
      cy.wait('@getOrdersStat').then((interception) => {
        const responseData = interception.response.body.data;  
        expect(responseData.thisMonth).to.equal(20);
        expect(responseData.thisWeek).to.equal(10);
        expect(responseData.totalOrders).to.equal(100);
        expect(responseData.today).to.equal(5);
      });
  
      // Optionally, assert that ui displays correctly
      cy.get('[data-cy="thismonth-orders"]').should('contain', '20')
      cy.get('[data-cy="thisweek-orders"]').should('contain', '10');
      cy.get('[data-cy="today-orders"]').should('contain', '5');
    });
  });
  