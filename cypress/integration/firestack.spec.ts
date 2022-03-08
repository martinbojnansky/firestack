describe('firestack', () => {
  before(() => {
    cy.visit('/');
  });

  it('start app', () => {
    cy.get('[data-tid="layout__header-title"]').should(
      'contain.text',
      '🔥 Firestack',
    );
  });
});
