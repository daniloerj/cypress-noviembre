//genera un caso de prueba de login exitoso
describe('Login Exitoso', () => {

  it('Debería permitir al usuario cerrar sesión', () => {
  //genera casos de prueba para data driven testing de login fallido en base a archito fixture user.json
  cy.fixture('user').then((users) => {
    users.forEach((user) => {
        // Visitar la página de inicio de sesión
        cy.visit('/practice-test-login');
        //usar el fixture  de user para ejecutar el login segun los usuarios definidos
        cy.login(user.username, user.password);
        // Verificar que el usuario permanezca en la página de inicio de sesión
        cy.url().should('include', user.url);
        // Verificar que el mensaje de error esté visible
        cy.contains(user.message).should('be.visible');
    });
  });
  });

}); 