describe('firestack', () => {
  before(() => {
    cy.visit('/');
  });

  it('start app', () => {
    cy.get('[data-tid="app-component__log-item"]').should('not.exist');
    cy.get('[data-tid="app-component__create-log-button"]').should(
      'contains.text',
      'Create log',
    );
  });

  it('should create log', () => {
    cy.get('[data-tid="app-component__create-log-button"]').click();
    cy.get('[data-tid="app-component__log-item"]').should('have.length', 1);
  });
});
