describe('Home page', () => {
  it('loads successfully', () => {
    cy.visit('/');
    cy.contains('AI Resume').should('exist');
  });
});
