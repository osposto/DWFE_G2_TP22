import React from 'react';

/**
 * SkipLinkTactico
 * Elemento de accesibilidad primaria (WCAG 2.1 AA / AAA).
 * 
 * Permite a usuarios que navegan mediante teclado o lectores de pantalla
 * saltear el menú lateral persistente y llegar directamente al panel operativo
 * de cada página con un solo toque de 'Tab'.
 */
export default function SkipLinkTactico({ destinoId = 'contenido-operativo' }) {
  return (
    <a
      href={`#${destinoId}`}
      className="skip-link-tactico"
      onClick={(e) => {
        const elemento = document.getElementById(destinoId);
        if (elemento) {
          elemento.setAttribute('tabindex', '-1');
          elemento.focus();
        }
      }}
    >
      ⇥ Saltar directamente a la consola de operaciones (Contenido principal)
    </a>
  );
}

