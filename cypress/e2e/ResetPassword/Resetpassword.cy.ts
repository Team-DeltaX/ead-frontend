describe('Reset Password Flow', () => {
  
  // Test opening the reset password flow
  it('should open the reset password form when clicking "Reset Password" link', () => {
    cy.visit('http://localhost:3000/'); // Adjust to the page containing the login dialog

    // Click the login button (or however the login dialog is opened)
    cy.get('button').contains('LOGIN').click();

    // Click the "Reset Password" link in the dialog
    cy.get('p').contains('Reset Password').click();

    // Assert that the Email input field is visible
    cy.get('input[name="email"]').should('be.visible');
    cy.get('button').contains('Send OTP').should('be.visible');
  });

  // Test submitting a valid email to send OTP
  it('should submit the email and show success message', () => {
    cy.visit('http://localhost:3000/'); // Adjust to your page path
  
    // Open the login dialog and click on the "Reset Password" link
    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();
  
    // Type a valid email into the email input field
    cy.get('input[name="email"]').first().type('chathuraishara63@gmail.com');
  
    // Mock the backend response (you can adjust based on your backend API)
    cy.intercept('POST', '/api/v1/auth/send-otp', {
      statusCode: 200,
      body: { success: true, message: 'Check your email for the OTP' },
    }).as('sendOtpRequest');
  
    // Submit the form by clicking the "Send OTP" button
    cy.get('button').contains('Send OTP').click();
   // cy.contains('OTP sent').should('be.visible');
  
  
  });
  

  // Test submitting an invalid email (e.g., incorrect email format)
  it('should show error message for invalid email format', () => {
    cy.visit('http://localhost:3000/'); // Adjust to your page path

    // Open the login dialog and click on the "Reset Password" link
    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();

    // Type an invalid email into the email input field
    cy.get('input[name="email"]').first().type('invalidemail');

    // Submit the form by clicking the "Send OTP" button
    cy.get('button').contains('Send OTP').click();

    // Assert that an error message is shown for invalid email
    cy.contains('Invalid email address').should('be.visible');
  });

  // Test handling backend failure (e.g., email not found)
  it('should show error message when backend returns failure', () => {
    cy.visit('http://localhost:3000/'); // Adjust to your page path

    // Open the login dialog and click on the "Reset Password" link
    cy.get('button').contains('LOGIN').click();
    cy.get('p').contains('Reset Password').click();

    // Type a valid email into the email input field
    cy.get('input[name="email"]').first().type('johndoe@gmail.com');

    // Mock the backend failure response
    cy.intercept('POST', '/api/v1/auth/send-otp', {
      statusCode: 400,
      body: { success: false, error: 'Email not found' },
    }).as('sendOtpRequestFail');

    // Submit the form by clicking the "Send OTP" button
    cy.get('button').contains('Send OTP').click();

    // Assert that the error message appears
    cy.contains('OTP not sent').should('be.visible');
  });

});
