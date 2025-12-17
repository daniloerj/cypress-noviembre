export class ProductsPage {
  visit() {
    cy.visit('https://automationexercise.com/products');
  }

  searchProduct(name) {
    // the site uses an input with id #search_product and a submit button with id #submit_search
    cy.get('#search_product').clear().type(name);
    cy.get('#submit_search').click();
  }

  getSearchResults() {
    // container that usually holds product list
    return cy.get('.features_items');
  }

  openProductByName() {
    // click the product's details
    this.getSearchResults()
      .find('a')
      .contains(/View Product|product_details/i)
      .first()
      .click({ force: true });
  }
}
