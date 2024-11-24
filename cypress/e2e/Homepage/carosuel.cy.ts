describe('Carousel Tests', () => {
  const contentArray = [
    {
      mainText: "iPhone 14 Pro",
      description: "Revolutionizing mobile technology. Built to excel.",
    },
    {
      mainText: "Apple Watch S8",
      description: "Personalized health insights, right on your wrist.",
    },
    {
      mainText: "iPad Pro M2",
      description: "Enhanced performance, endless possibilities.",
    },
    {
      mainText: "MacBook M2",
      description: "A powerhouse to bring your ideas to life.",
    },
  ];

  it('should autoplay the carousel', () => {
    cy.visit('http://localhost:3000/');
    
    // Check the first carousel item is visible
    cy.get('[data-testid="carousel-item"]').first().should('be.visible');

    // Wait for autoplay delay
    cy.wait(3000);

    // Check if the next carousel item becomes visible
    cy.get('[data-testid="carousel-item"]')
      .eq(1)
      .should('be.visible');
  });

  it('should display correct content in carousel items with delays', () => {
    cy.visit('http://localhost:3000/');

    contentArray.forEach((item, index) => {
      // Wait for the carousel to display the current item
      if (index > 0) cy.wait(3000); // Autoplay delay

      cy.get('[data-testid="carousel-item"]')
        .eq(index)
        .within(() => {
          cy.get('[data-testid="carousel-item-maintext"]').contains(item.mainText);
          cy.get('[data-testid="carousel-item-description"]').contains(item.description);
        });
    });
  });
});
