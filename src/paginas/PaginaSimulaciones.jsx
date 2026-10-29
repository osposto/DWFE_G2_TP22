import React from 'react';
import { Link } from 'react-router-dom';
import ConsolaRolInteractiva from '../componentes/simulaciones/ConsolaRolInteractiva';
import FormularioIncidenteSOC from '../componentes/simulaciones/FormularioIncidenteSOC';
import BarraModoTactico from '../componentes/simulaciones/BarraModoTactico';
import SkipLinkTactico from '../componentes/simulaciones/SkipLinkTactico';

export default function PaginaSimulaciones() {
  return (
    <div className="home-shell" style={{ position: 'relative' }}>
      <SkipLinkTactico destinoId="laboratorio-tactico" />

      {/* Barra superior de control de simulaciones */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '1rem 1.4rem',
        margin: '0 0 2rem',
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(56, 189, 248, 0.35)',
        borderRadius: '6px',
        backdropFilter: 'blur(10px)'
      }}>
        <div>
          <span style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--color-primario-2, #00f0ff)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            🧪 CONSOLA DE SIMULACIONES TÁCTICAS
          </span>
          <h2 style={{ margin: '0.3rem 0 0', fontSize: '1.25rem', color: '#f1f5f9' }}>
            Simuladores Operativos y Respuesta Técnica
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Alternador de Modo Táctico */}
          <BarraModoTactico />
          <Link to="/" className="btn-reiniciar" style={{ textDecoration: 'none', padding: '0.45rem 0.9rem' }}>
            ← Volver a la Portada Oficial
          </Link>
        </div>
      </div>

      <div id="laboratorio-tactico" tabIndex="-1" style={{ outline: 'none' }}>
        {/* ============================================================== */}
        {/* BLOQUE 1: CONSOLA DE ROLES INTERACTIVA                          */}
        {/* ============================================================== */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="system-overline">MÓDULO 1 · INTERACCIÓN TÉCNICA DE ROLES</span>
            <h1 style={{ fontSize: '2.1rem', margin: '0.4rem 0', color: 'var(--color-texto)' }}>
              Consola de Operaciones y Demostración por Integrante
            </h1>
            <p style={{ color: 'var(--color-texto-suave)', maxWidth: '820px', lineHeight: '1.6' }}>
              Cada integrante demuestra su responsabilidad técnica en vivo. Podés probar las tres simulaciones reactivas usando los botones de arriba de la consola:
            </p>
          </div>

          <ConsolaRolInteractiva integranteId="orlando" />
        </section>

        {/* ============================================================== */}
        {/* BLOQUE 2: FORMULARIO ACCESIBLE DE INCIDENTES / CONTACTO        */}
        {/* ============================================================== */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="system-overline">MÓDULO 2 · CANAL FORMAL Y ACCESIBLE (WCAG)</span>
          </div>

          <FormularioIncidenteSOC />
        </section>
      </div>
    </div>
  );
}

