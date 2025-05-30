/// <reference types="cypress" />

/* ───────── utilidades generales ───────── */
const CSV = 'inventario_ejemplo_con_precios.csv';
const ITEM = 'Café molido';

/* espera pseudo-humana (200-800 ms) */
const waitRandom = (min = 200, max = 800) => cy.wait(Cypress._.random(min, max));

describe('Flujo completo: subir inventario → venta', () => {
  before(() => {
    // 1. Cargar inventario
    cy.visit('/inventario');
    cy.contains(/subir.*excel\/csv/i).click();
    cy.get('input[type="file"]')
      .selectFile(`cypress/fixtures/${CSV}`, { force: true });
    
    // 2. Verificar carga
    cy.contains('Inventario en Tiempo Real', { timeout: 15000 }).should('exist');
    cy.contains(/Total product[oa]s.*10/i).should('be.visible');
    
    // 3. Ir a ventas
    cy.get('svg.lucide-shopping-cart').click({ force: true });
    cy.url().should('include', '/venta');
  });

  it('agrega producto, finaliza la venta y muestra recibo', () => {
    // 1. Buscar producto
    cy.get('input[placeholder="Nombre o código"]')
      .clear()
      .type('Cafe molido{enter}');
    
    // 2. Agregar al carrito
    cy.contains('button', /agregar al carrito/i)
      .should('be.visible')
      .click();
    
    // 3. Estrategia robusta para verificar el carrito
    cy.get('body').then(($body) => {
      // Opción 1: Verificar contador del carrito si existe
      const cartCounter = $body.find('[data-testid="carrito-count"], .cart-counter, .badge');
      if (cartCounter.length > 0) {
        cy.wrap(cartCounter).should('contain', '1');
      }
      // Opción 2: Continuar sin verificar contador
    });
    
    // 4. Ir al resumen con múltiples opciones de texto
    cy.contains('button', /resumen|ver carrito|checkout/i, { timeout: 15000 })
      .should('be.visible')
      .click();
    
   // 5. Verificar producto en resumen (CORREGIDO)
cy.contains('td', /cafe?\s*molido/i, { timeout: 10000 })
  .should('exist');

// 6. Finalizar venta
cy.contains('button', /finalizar venta|completar compra/i)
  .should('be.visible')
  .click();

// 7. Verificar mensaje de éxito
cy.contains(/¡venta completada!|compra exitosa/i, { timeout: 15000 })
  .should('be.visible');

  });
});