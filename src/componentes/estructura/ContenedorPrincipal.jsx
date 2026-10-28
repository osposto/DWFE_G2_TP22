import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import SkipLinkTactico from '../alternativa/SkipLinkTactico';
import BarraModoTactico from '../alternativa/BarraModoTactico';
import './ContenedorPrincipal.css';

export default function ContenedorPrincipal() {
  const [estaExpandida, setEstaExpandida] = useState(false);
  const [estaAbiertaMovil, setEstaAbiertaMovil] = useState(false);

  return (
    <div className={`estructura-raiz ${estaExpandida ? 'sidebar-expandida' : 'sidebar-colapsada'}`}>
      {/* Skip link táctico para accesibilidad por teclado (WCAG 2.1) */}
      <SkipLinkTactico destinoId="contenido-operativo" />

      {/* Telón oscurecido para cerrar el menú en móviles */}
      <div
        className={`telon-fondo ${estaAbiertaMovil ? 'abierto' : ''}`}
        onClick={() => setEstaAbiertaMovil(false)}
        aria-hidden="true"
      />

      {/* Menú lateral inteligente con alternador de expansión estilo Gemini */}
      <BarraLateral
        estaExpandida={estaExpandida}
        alAlternarExpandir={() => setEstaExpandida(!estaExpandida)}
        estaAbiertaMovil={estaAbiertaMovil}
        alCerrarMovil={() => setEstaAbiertaMovil(false)}
      />

      <div className="contenido-principal-layout">
        {/* Barra superior con alternador táctico y menú móvil */}
        <header className="cabecera-movil" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button
              type="button"
              className="boton-hamburguesa"
              onClick={() => setEstaAbiertaMovil(!estaAbiertaMovil)}
              aria-label="Abrir menú de navegación"
            >
              ☰
            </button>
            <span className="titulo-cabecera-movil">200 - OK · SOC</span>
          </div>

          <BarraModoTactico />
        </header>

        {/* Punto de montaje para las rutas hijas de React Router */}
        <main id="contenido-operativo" className="contenedor-pagina" tabIndex="-1" style={{ outline: 'none' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
