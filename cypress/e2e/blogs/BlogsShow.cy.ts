describe('BlogPage Component (Real Server Response)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/blog'); 
  });

  it('should display the loading spinner while fetching blogs', () => {
    cy.get('[data-cy=spinner]').should('be.visible'); 
    cy.get('[data-cy=spinner]', { timeout: 10000 }).should('not.exist'); 
  });

  it('should display fetched blogs when available', () => {
    cy.get('[data-cy=carousel]').should('exist'); 

   
    cy.get('[data-cy=carousel-item]', { timeout: 10000 }).should('have.length.greaterThan', 0);

   
    cy.get('[data-cy=carousel-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=blog-title]').should('exist').and('not.be.empty');
        cy.get('[data-cy=blog-content]').should('exist').and('not.be.empty');
        cy.get('[data-cy=blog-date]').should('exist').and('not.be.empty');
      });
  });

  it('should navigate to blog details page when "Read More" is clicked', () => {
    cy.get('[data-cy=carousel-item]')
      .first()
      .within(() => {
        cy.get('[data-cy=read-more-button]').click();
      });

   
    cy.url().should('include', '/blog/');
    cy.get('[data-cy=blog-details]').should('exist'); 
  });

 
});
