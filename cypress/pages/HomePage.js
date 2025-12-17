export class HomePage {
  visit() {
    cy.visit('https://automationexercise.com/');
  }

  getLogo() {
    // tries a common pattern: clickable logo or header image
    return cy.get('header').find('img').first();
  }

  goToProducts() {
    // navigation link to Products page
    cy.get('a').contains(/Products|products/i).first().click();
  }
}
