export class ProductDetailPage {
  addToCart() {
    // common patterns: button with text Add to cart or an id/class
    cy.contains(/Add to cart|Add to Cart/i).first().click({ force: true });
  }

  viewCart() {
    // link to view cart
    cy.get('a').contains(/Cart|View Cart|View cart/i).first().click({ force: true });
  }
}
