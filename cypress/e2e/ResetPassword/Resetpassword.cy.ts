describe('Reset Password Flow', () => {
  
 
  it('should open the reset password form when clicking "Reset Password" link', () => {
    cy.visit('http://localhost:3000/'); 

  
    cy.get('button').contains('LOGIN').click();

    // Click the "Reset Password" link in the dialog
    cy.get('p').contains('Reset Password').click();

   
    cy.get('input[name="email"]').should('be.visible');
    cy.get('button').contains('Send OTP').should('be.visible');
  });


  it('should submit the email and show success message', () => {
    cy.visit('http://localhost:3000/'); 
  
   
    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();
  
    // Type a valid email 
    cy.get('input[name="email"]').first().type('chathuraishara63@gmail.com');
  
  
    cy.intercept('POST', '/api/v1/auth/send-otp', {
      statusCode: 200,
      body: { success: true, message: 'Check your email for the OTP' },
    }).as('sendOtpRequest');
  
   
    cy.get('button').contains('Send OTP').click();
 
  
  
  });
  

  // Test submitting an invalid email
  it('should show error message for invalid email format', () => {
    cy.visit('http://localhost:3000/');

   
    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();

    // Type an invalid email 
    cy.get('input[name="email"]').first().type('invalidemail');

  
    cy.get('button').contains('Send OTP').click();

   
    cy.contains('Invalid email address').should('be.visible');
  });

 
  it('should show error message when backend returns failure', () => {
    cy.visit('http://localhost:3000/'); // Adjust to your page path

    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();

    // Type a valid email into the email input field
    cy.get('input[name="email"]').first().type('johndoe@gmail.com');

 
    cy.intercept('POST', '/api/v1/auth/send-otp', {
      statusCode: 400,
      body: { success: false, error: 'Email not found' },
    }).as('sendOtpRequestFail');

    cy.get('button').contains('Send OTP').click();

    cy.contains('OTP not sent').should('be.visible');
  });

});
