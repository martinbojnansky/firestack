describe('firestack', () => {
  before(() => {
    cy.visit('/');
  });

  it('start app', () => {
    cy.get('[data-tid="home-view__log-item"]').should('not.exist');
    cy.get('[data-tid="home-view__create-log-button"]').should(
      'contains.text',
      'Create log',
    );
  });

  it('should create log', () => {
    cy.get('[data-tid="home-view__create-log-button"]').click();
    cy.get('[data-tid="home-view__log-item"]').should('have.length', 1);
  });
});
