describe('Dashboard stats details showing', () => {

    beforeEach(() => {
      // Visit the page and perform the login before each test case
      cy.visit('http://localhost:3000/');
      cy.get('button[data-cy="open-login-dialog"]').click();
  
      // Valid login credentials
      cy.get('input[name="email"]').type('admin@gmail.com');    
      cy.get('input[name="password"]').type('admin1234');
      cy.get('button[type="submit"]').click();
    });
  
    it('should return mock data for /orders/stat and display order stats', () => {
      // Intercept the GET request for orders/stat
      cy.intercept('GET', 'http://localhost:8080/api/v1/orders/stat', { fixture: 'mockOrdersStat.json' }).as('getOrdersStat');
  
      // Wait for the intercepted request and assert the mock data
      cy.wait('@getOrdersStat').then((interception) => {
        if (interception.response && interception.response.body) {
          const responseData = interception.response.body.data;
          expect(responseData.thisMonth).to.equal(20);
          expect(responseData.thisWeek).to.equal(10);
          expect(responseData.totalOrders).to.equal(100);
          expect(responseData.today).to.equal(5);
        } else {
          throw new Error('No response received for GET /orders/stat');
        }
      });
  
      // Assert that the UI displays the order data correctly
      cy.get('[data-cy="thismonth-orders"]').should('contain', '20');
      cy.get('[data-cy="thisweek-orders"]').should('contain', '10');
      cy.get('[data-cy="today-orders"]').should('contain', '5');
      cy.get('[data-cy="totalorders"]').should('contain', '100');
    });
  
    it('should return mock data for /revenue/stat and display revenue stats', () => {
      // Intercept the GET request for revenue/stat
      cy.intercept('GET', 'http://localhost:8080/api/v1/orders/revstat', { fixture: 'mockOrderRevStat.json' }).as('getRevenueStat');
  
      // Wait for the intercepted request and assert the mock data
      cy.wait('@getRevenueStat').then((interception) => {
        if (interception.response && interception.response.body) {
          const revenueData = interception.response.body.data;
        expect(revenueData.thisMonthRev).to.equal(20000);
        expect(revenueData.thisWeekRev).to.equal(10000);
        expect(revenueData.todayRev).to.equal(800);
        }else
        {
          throw new Error('No response received for GET /orders/stat');
        }
      });
  
      // Assert that the UI displays the revenue data correctly
      cy.get('[data-cy="thismonth-rev"]').should('contain', '20000');
      cy.get('[data-cy="thisweek-rev"]').should('contain', '10000');
      cy.get('[data-cy="today-rev"]').should('contain', '800');
      cy.get('[data-cy="totalrev"]').should('contain', '1000');
    });
  
  });
  