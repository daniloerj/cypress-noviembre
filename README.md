## Curso Cypress — Automatización de pruebas

Proyecto de ejemplo para aprender y practicar automatización de pruebas end-to-end con Cypress.

### Resumen

Este repositorio contiene una suite de pruebas E2E escrita con Cypress (v15.x). Incluye pruebas organizadas por páginas y casos de uso, utilidades para generar reportes con Mochawesome y scripts para ejecutar y consolidar resultados.

### Contrato (rápido)
- Entrada: código fuente de tests en `cypress/e2e` y fixtures en `cypress/fixtures`.
- Salida: ejecución de pruebas en la terminal y reportes en `report`/`reports` (JSON/HTML) cuando se ejecuta con Mochawesome.
- Criterios de éxito: las pruebas se ejecutan sin errores y los reportes se generan correctamente.

### Requisitos
- Node.js (recomendado 16+).
- npm (incluido con Node).
- Dependencias del proyecto (instaladas vía `npm install`).
- Navegador Chrome si desea ejecutar `test:chrome`.

### Instalación

1. Clonar el repositorio:

```bash
git clone <repositorio> && cd cypress-noviembre
```

2. Instalar dependencias:

```bash
npm install
```

3. Verificar que Cypress esté instalado (opcional):

```bash
npx cypress --version
```

### Estructura del proyecto

Carpetas principales:

```
cypress/
  e2e/                # tests organizados por suites
    automationexercise/
      automation.cy.js
    users/
      login.cy.js
  fixtures/            # datos de prueba (json)
  pages/               # Page Objects (CartPage, HomePage, ...)
  support/             # comandos personalizados y configuración
scripts/
  generateReport.js    # genera reportes HTML a partir de JSON
  mergeReports.js      # une múltiples JSON de mochawesome
package.json           # scripts y dependencias
cypress.config.js      # configuración de Cypress
```

### Scripts útiles (desde `package.json`)

Lista de scripts disponibles y su propósito:

- `npm test` — Ejecuta todas las pruebas en modo headless con Cypress.
- `npm run test:chrome` — Ejecuta las pruebas con el navegador Chrome.
- `npm run test:chrome:users` — Ejecuta únicamente las specs bajo `cypress/e2e/users` en Chrome.
- `npm run clean-reports` — Limpia y crea las carpetas `reports` y `report`.
- `npm run test:chrome:mochawesome` — Ejecuta las pruebas de users en Chrome y genera reportes JSON con Mochawesome (usa `REPORT_NAME` basado en timestamp).
- `npm run merge-reports` — Ejecuta `scripts/mergeReports.js` para combinar JSON de mochawesome.
- `npm run generate-report` — Ejecuta `scripts/generateReport.js` para producir el HTML final.
- `npm run report:full` — Flujo completo: ejecutar pruebas -> unir reportes -> generar HTML.

Ejemplos rápidos:

Ejecutar todas las pruebas en Chrome (headless):

```bash
npm run test:chrome
```

Ejecutar el flujo completo de reportes:

```bash
npm run report:full
```

Abrir la UI interactiva de Cypress (opcional):

```bash
npx cypress open
```

### Cómo escribir y organizar tests

- Siga el patrón de Page Object ubicado en `cypress/pages` para mantener selectores y acciones en un solo lugar.
- Coloque las especificaciones en `cypress/e2e/<categoria>/`.
- Use `cypress/fixtures` para datos estáticos y `cy.fixture()` dentro de los tests.
- Agregue comandos reutilizables en `cypress/support/commands.js`.

### Reportes

Este proyecto usa Mochawesome para transformar resultados JSON en reportes HTML.

Flujo recomendado para CI/local:

1. `npm run test:chrome:mochawesome` (crea JSON por ejecución).
2. `npm run merge-reports` (combina todos los JSON en uno solo).
3. `npm run generate-report` (genera HTML final en la carpeta `report`).

Los scripts `scripts/mergeReports.js` y `scripts/generateReport.js` contienen la lógica para combinar y generar los reportes.

### Buenas prácticas y notas

- Mantener fixtures pequeñas y representativas.
- Evitar esperas fijas (no usar `cy.wait()` con valores grandes salvo en casos justificados).
- Asegurar que los selectores sean robustos (usar atributos data-qa/data-cy cuando sea posible).
- Diseñar tests independientes (no depender del orden de ejecución).

### Integración CI

En un pipeline CI (GitHub Actions, GitLab CI, Jenkins) recomendamos:

- Instalar node y dependencias.
- Ejecutar `npm run report:full` y publicar la carpeta `report` como artefacto.
- Fallar el job si `npm test` retorna un estado distinto a 0.

Ejemplo (resumen):

```yaml
# job: install -> npm install
# job: test -> npm run test:chrome:mochawesome
# job: reports -> npm run merge-reports && npm run generate-report
```

### Contribuir

1. Hacer fork y crear una rama feature/bugfix.
2. Añadir tests y/o actualizar documentación si aplica.
3. Abrir un pull request describiendo los cambios.

### Licencia

Por defecto este proyecto tiene la licencia `ISC` configurada en `package.json`. Ajuste según necesidades.

### Contacto

Si tienes preguntas o sugerencias, abre un issue o contacta al mantenedor del repositorio.

---

Archivo creado automáticamente: `README.md` — contiene instrucciones para instalación, ejecución y generación de reportes con Cypress y Mochawesome.
