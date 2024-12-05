describe('Admin Blogs Showing and updating', () => {

  beforeEach(() => {
   
    cy.intercept('GET', 'http://localhost:8080/api/v1/blogs', { fixture: 'mockBlogs.json' }).as('getBlogs');

    cy.visit('http://localhost:3000/');
    cy.get('button[data-cy="open-login-dialog"]').click();

    // Valid login credentials
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

   
    cy.get('[data-cy="link-admin-blog"]').click();

   
    cy.wait('@getBlogs');
  });

  it('should display the list of blogs fetched from the API', () => {

    cy.get('tbody tr').should('have.length.at.least', 1); // At least one blog is displayed
  });
  it('should filter the blog list based on the search term', () => {
    cy.wait('@getBlogs');

    cy.get('input[placeholder="Search blogs..."]').type('Introduction to Next.js');

    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr td').first().should('contain', 'Introduction to Next.js'); 
  });
  it('should add a new blog and display it in the list', () => {
    cy.intercept('POST', 'http://localhost:8080/api/v1/blogs', { id: 123, title: 'New Blog', content: 'New blog content' }).as('addBlog');

   
    cy.wait('@getBlogs');

    cy.get('[data-cy="add-blog-button"]').click();
    cy.get('input[name="title"]').type('New Blog');
    cy.get('input[name="image"]').type('https://example.com/image.jpg');
    cy.get('textarea[name="content"]').type('New blog content');

    cy.get('[data-cy="save-blog"]').click();

    cy.get('[data-cy="alert-continue"]').click();

    
    cy.wait('@addBlog');

   
  });

  it('should update a blog and reflect changes in the blog list', () => {
   
    const updatedBlog = {
      id: 1,
      title: 'Updated Blog Title',
      imageUrl: 'https://example.com/updated-image.jpg',
      content: 'Updated blog content...',
    };

   
    cy.intercept('PUT', 'http://localhost:8080/api/v1/blogs/1', {
      statusCode: 200,
      body: { success: true, data: updatedBlog },
    }).as('updateBlog');

   
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('button')
          .contains('Edit')
          .click(); // Click the Edit button
      });

    // Fill in the new details
    cy.get('input#name').clear().type(updatedBlog.title);
    cy.get('input#image').clear().type(updatedBlog.imageUrl);
    cy.get('textarea').clear().type(updatedBlog.content);

    // Click Save
    cy.get('button').contains('Save Changes').click();
    cy.get('[data-cy="alert-continue"]').click();

    // Wait for the PUT request and ensure the request was successful
    cy.wait('@updateBlog');

   
  });

  it('should delete a blog and remove it from the list', () => {
    cy.intercept('DELETE', 'http://localhost:8080/api/v1/blogs/1', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteBlog');

    cy.get('[data-cy="deletebutton"]').first().click();

   
    cy.get('[data-cy="alert-continue"]:visible').click(); 

     cy.wait('@deleteBlog');

  });



});
