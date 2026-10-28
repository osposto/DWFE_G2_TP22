import React from 'react';
import { Link } from 'react-router-dom';
import integrantes from '../datos/datosIntegrantes';
import capacidades from '../datos/capacidades.json';
import TarjetaIntegrante from '../componentes/integrantes/TarjetaIntegrante';
import FormularioIncidenteSOC from '../componentes/alternativa/FormularioIncidenteSOC';

export default function PaginaInicio() {
  return (
    <div className="home-shell">
      <section className="dashboard-heading">
        <div className="dashboard-copy">
          <p className="system-overline">200 - OK / Centro de operaciones</p>
          <h1>Defensa digital para sistemas que no pueden detenerse.</h1>
          <p>
            Desarrollamos software, sitios web y soluciones SaaS con foco en
            ciberseguridad, ciberdefensa, sistemas industriales ICS/SCADA, sistemas
            embebidos y respuesta ante incidentes.
          </p>
          <div className="hero-actions">
            <a href="#equipo" className="primary-button">
              Explorar el equipo
            </a>
            <Link to="/capacidades" className="secondary-button">
              Consultar capacidades
            </Link>
          </div>
        </div>

        <aside className="sector-board" aria-label="Áreas de especialización del equipo">
          <span className="sector-board-label">Áreas de operación</span>
          <ul className="sector-list">
            <li>ICS / SCADA</li>
            <li>Sistemas embebidos</li>
            <li>Respuesta ante incidentes</li>
            <li>Ciberdefensa</li>
          </ul>
        </aside>
      </section>

      <nav className="telemetry-strip" aria-label="Resumen del equipo">
        <a className="telemetry-item" href="#equipo">
          <span className="telemetry-value">{String(integrantes.length).padStart(2, '0')}</span>
          <span className="telemetry-label">Integrantes<br />del equipo</span>
        </a>
        <Link className="telemetry-item" to="/capacidades">
          <span className="telemetry-value">{String(capacidades.length).padStart(2, '0')}</span>
          <span className="telemetry-label">Capacidades<br />documentadas</span>
        </Link>
        <Link className="telemetry-item" to="/arquitectura">
          <span className="telemetry-value">SPA</span>
          <span className="telemetry-label">Arquitectura<br />del proyecto</span>
        </Link>
      </nav>

      <div id="equipo" className="section-heading">
        <h2>Equipo de respuesta</h2>
        <span>{String(integrantes.length).padStart(2, '0')} perfiles</span>
      </div>

      <div className="team-grid">
        {integrantes.map((integrante) => (
          <TarjetaIntegrante key={integrante.id} integrante={integrante} />
        ))}
      </div>
      <p className="dashboard-footnote">Los datos personales y culturales se completan con información confirmada por cada integrante.</p>

      {/* Canal de Reporte y Contacto SOC (Mejora v2) */}
      <FormularioIncidenteSOC />
    </div>
  );
}
