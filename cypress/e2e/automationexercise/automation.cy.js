import { HomePage } from '../../pages/HomePage'
import { ProductsPage } from '../../pages/ProductsPage'
import { ProductDetailPage } from '../../pages/ProductDetailPage'
import { CartPage } from '../../pages/CartPage'

describe('AutomationExercise POM Suite', () => {
  const home = new HomePage()
  const products = new ProductsPage()
  const detail = new ProductDetailPage()
  const cart = new CartPage()
  const productName = 'Blue Top'

  it('1 - opens Home page', () => {
    home.visit()
    home.getLogo().should('be.visible')
    // Basic title check (site shows "Automation Exercise" in title)
    cy.title().should('include', 'Automation')
  })

  it('2 - visits Products and searches for a product', () => {
    home.visit()
    home.goToProducts()
    products.searchProduct(productName)
    // Assert that search results contain the product name
    products.getSearchResults().should('contain', productName)
  })

  it('3 - adds product to cart', () => {
    // From products page open product details and add to cart
    products.visit()
    products.searchProduct(productName)
    products.openProductByName()
    // add to cart on product detail
    detail.addToCart()

    // many sites show a modal / overlay with a View Cart link - try to find it then assert cart
    cy.contains('View Cart').click()

    // final assertion: cart contains the product
    cart.getCartItems().should('contain', productName)    
  })
})
