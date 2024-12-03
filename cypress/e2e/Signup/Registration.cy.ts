describe('Registration Form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/auth'); 
    });
  
    it('should successfully submit the form and redirect on success', () => {
    
      cy.intercept('POST', '/api/v1/auth/register', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Registration successful',
          data: { user: { firstName: 'John', email: 'john@example.com' } },
        },
      }).as('registerUser');
  
   
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="phone"]').type('0712345678');
      cy.get('input[name="address"]').type('123, Main Street, Colombo 05');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
  
      cy.get('button').contains('REGISTER').click();
  
   
      cy.url().should('eq', 'http://localhost:3000/');
    });
  
    it('should show an error message when registration fails', () => {
    
      cy.intercept('POST', '/api/v1/auth/register', {
        statusCode: 400,
        body: { success: false, message: 'Registration failed' },
      }).as('registerUser');
  
    
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="phone"]').type('0712345678');
      cy.get('input[name="address"]').type('123, Main Street, Colombo 05');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
  
     
      cy.get('button').contains('REGISTER').click();
  
      
      cy.wait('@registerUser');
  
    
      cy.contains('Registration failed').should('be.visible');
    });
    it('should show validation errors for empty fields', () => {
        // Submit the form without filling any fields
        cy.get('button').contains('REGISTER').click();
    
       
        cy.contains('First name is required').should('be.visible');
        cy.contains('Last name is required').should('be.visible');
        cy.contains('Invalid email').should('be.visible');
        cy.contains('Phone number is required').should('be.visible');
        cy.contains('Address is required').should('be.visible');
        cy.contains('Password must be at least 6 characters long').should('be.visible');
        cy.contains('Please confirm your password').should('be.visible');
      });

      it('should show validation errors for invalid input formats', () => {
        // Fill the form with invalid email and phone number
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('invalid-email');
        cy.get('input[name="phone"]').type('12345'); // Invalid phone number
        cy.get('input[name="address"]').type('123, Main Street, Colombo 05');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
    
       
        cy.get('button').contains('REGISTER').click();
    
       
        cy.contains('Invalid email').should('be.visible');
        cy.contains('Phone number must start with 0 and have exactly 10 digits').should('be.visible');
      });

      it('should show an error when passwords do not match', () => {
        // Fill the form with mismatched passwords
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');
        cy.get('input[name="email"]').type('johndoe@example.com');
        cy.get('input[name="phone"]').type('0712345678');
        cy.get('input[name="address"]').type('123, Main Street, Colombo 05');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('differentPassword');
    
        cy.get('button').contains('REGISTER').click();
    
       
        cy.contains('Passwords must match').should('be.visible');
      });

    
    
  });
  