export class CartPage {
  getCartItems() {
    // cart table / info container
    return cy.get('.cart_info, .cart_items, #cart_info',{ timeout: 10000 }).first();
  }

  hasProduct(name) {
    return cy.contains('.cart_description, .cart_item, .cartTable', name);
  }
}
