import React, { useState, useEffect } from 'react';
import '../../estilos/tokens-tacticos.css';

/**
 * BarraModoTactico
 * Alternador accesible de visualización temática inspirado en el interruptor
 * de tema de Eximia Code, pero adaptado a la narrativa de Ciberdefensa:
 * 
 * - Modo SOC Neón (Predeterminado): Fondo estelar, cian/azul, glassmorphism.
 * - Modo Táctico Industrial (Alto Contraste): Fondo negro puro, bordes y tipografías
 *   en ámbar hazard (#fbbf24) con ratio de contraste extremo (> 16:1) para
 *   pantallas de control industrial o entornos con alta luz ambiental.
 */
export default function BarraModoTactico() {
  const [modoIndustrial, setModoIndustrial] = useState(() => {
    try {
      return localStorage.getItem('soc-tema-tactico') === 'industrial';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (modoIndustrial) {
        document.documentElement.dataset.temaTactico = 'industrial';
        localStorage.setItem('soc-tema-tactico', 'industrial');
      } else {
        delete document.documentElement.dataset.temaTactico;
        localStorage.setItem('soc-tema-tactico', 'neon');
      }
    } catch {
      // Ignorar si el navegador bloquea localStorage
    }
  }, [modoIndustrial]);

  return (
    <div className="barra-modo-tactico" role="region" aria-label="Ajuste de contraste visual de consola">
      <button
        type="button"
        className={`btn-toggle-tactico ${modoIndustrial ? 'activo-industrial' : 'activo-neon'}`}
        onClick={() => setModoIndustrial((prev) => !prev)}
        aria-pressed={modoIndustrial}
        aria-label={
          modoIndustrial
            ? 'Cambiar a modo SOC Neón (predeterminado)'
            : 'Activar modo Táctico Industrial de alto contraste'
        }
      >
        <span className="icono-tactico" aria-hidden="true">
          {modoIndustrial ? '⚡' : '🛡️'}
        </span>
        <span className="texto-tactico">
          {modoIndustrial ? 'Modo Táctico Industrial (Alto Contraste)' : 'Modo SOC Neón (Cyber)'}
        </span>
      </button>
    </div>
  );
}

