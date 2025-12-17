# Cypress POM suite for https://automationexercise.com/

This folder contains a small Cypress test suite implemented using the Page Object Model (POM).

Files added:
- `cypress/pages/*` - page objects (HomePage, ProductsPage, ProductDetailPage, CartPage)
- `cypress/e2e/automationexercise/automation.spec.js` - spec with 3 tests: home, search, add-to-cart

Run the tests:

Open Cypress interactive runner:

```bash
npm run cy:open
```

Run headless:

```bash
npm run cy:run
```

Notes:
- Selectors are resilient but the real site structure may change; if a selector fails, inspect the target page and adapt the selector in the corresponding page object under `cypress/pages`.
- The tests assume the product name `Blue Top` exists. Change `productName` in the spec if needed.
