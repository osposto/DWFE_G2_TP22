import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BarraLateral.css';

const opcionesNavegacion = [
  {
    ruta: '/',
    icono: '🛡️',
    titulo: 'Portada',
    descripcionCorta: 'Presentación del equipo',
    descripcionDetallada: 'Centro de mando con la visión del colectivo, panel de métricas en vivo y acceso a los perfiles individuales de los integrantes.'
  },
  {
    ruta: '/capacidades',
    icono: '📦',
    titulo: 'Capacidades',
    descripcionCorta: 'Catálogo técnico local JSON',
    descripcionDetallada: 'Exploración interactiva de las 20 competencias técnicas del equipo con buscador en tiempo real, filtros por categoría y paneles desplegables de detalle.'
  },
  {
    ruta: '/servicios-api',
    icono: '🌐',
    titulo: 'Servicios API',
    descripcionCorta: 'Integración externa asíncrona',
    descripcionDetallada: 'Consulta asíncrona en tiempo real a GitHub REST API y Hacker News mediante pestañas con gestión explícita de carga, error y reintentos.'
  },
  {
    ruta: '/arquitectura',
    icono: '🌳',
    titulo: 'Árbol de Código',
    descripcionCorta: 'Jerarquía visual de componentes',
    descripcionDetallada: 'Esquema interactivo con nodos expandibles y colapsables que audita la jerarquía real de componentes React de la aplicación.'
  },
  {
    ruta: '/bitacora',
    icono: '📓',
    titulo: 'Bitácora',
    descripcionCorta: 'Registro de desarrollo',
    descripcionDetallada: 'Documentación cronológica de hitos, decisiones de arquitectura y resolución de dificultades técnicas estructurada en acordeones interactivos.'
  },
  {
    ruta: '/simulaciones',
    icono: '🧪',
    titulo: 'Simulaciones',
    descripcionCorta: 'Consola de simulaciones',
    descripcionDetallada: 'Consola interactiva de simulaciones: auditoría de roles técnicos por integrante, modo táctico de alto contraste y despacho de incidentes.'
  }
];

export default function BarraLateral({
  estaExpandida,
  alAlternarExpandir,
  estaAbiertaMovil,
  alCerrarMovil
}) {
  const [tooltipActivo, setTooltipActivo] = useState(null);

  const manejarMouseEnter = (e, titulo, descripcion, icono) => {
    // Si estamos en pantalla táctil/móvil no desplegar tooltip flotante
    if (window.innerWidth <= 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipActivo({
      top: rect.top + rect.height / 2,
      left: rect.right + 14,
      titulo,
      descripcion,
      icono
    });
  };

  const manejarMouseLeave = () => {
    setTooltipActivo(null);
  };

  return (
    <>
      <aside
        className={`barra-lateral-contenedor ${estaExpandida ? 'expandida' : 'colapsada'} ${
          estaAbiertaMovil ? 'abierta-movil' : ''
        }`}
        aria-label="Navegación principal"
      >
        {/* Encabezado superior con botón alternador estilo Gemini */}
        <div className="barra-lateral-cabecera">
          <button
            type="button"
            className="boton-alternar-menu"
            onClick={() => {
              manejarMouseLeave();
              alAlternarExpandir();
            }}
            onMouseEnter={(e) =>
              manejarMouseEnter(
                e,
                estaExpandida ? 'Contraer menú' : 'Expandir menú',
                estaExpandida
                  ? 'Reduce la barra a modo compacto de solo iconos para dar mayor amplitud al área de trabajo.'
                  : 'Despliega los títulos y subtítulos de cada sección para una lectura guiada.',
                estaExpandida ? '◀' : '☰'
              )
            }
            onMouseLeave={manejarMouseLeave}
            aria-label={estaExpandida ? 'Contraer menú lateral' : 'Expandir menú lateral'}
          >
            <span>{estaExpandida ? '◀' : '☰'}</span>
          </button>

          {estaExpandida && (
            <div className="marca-expandida">
              <span className="marca-nombre">DWFE · Grupo 2</span>
              <span className="marca-rol">SOC & Ciberdefensa ICS</span>
            </div>
          )}

          <button
            type="button"
            className="boton-cerrar-movil"
            onClick={alCerrarMovil}
            aria-label="Cerrar panel lateral"
          >
            ✕
          </button>
        </div>

        {/* Lista de navegación */}
        <nav className="barra-lateral-navegacion">
          {opcionesNavegacion.map((opcion) => (
            <NavLink
              key={opcion.ruta}
              to={opcion.ruta}
              className={({ isActive }) => `enlace-navegacion ${isActive ? 'activo' : ''}`}
              onClick={() => {
                manejarMouseLeave();
                alCerrarMovil();
              }}
              end={opcion.ruta === '/'}
              onMouseEnter={(e) =>
                manejarMouseEnter(
                  e,
                  opcion.titulo,
                  opcion.descripcionDetallada,
                  opcion.icono
                )
              }
              onMouseLeave={manejarMouseLeave}
            >
              <div className="enlace-icono-wrap">
                <span>{opcion.icono}</span>
              </div>

              {estaExpandida && (
                <div className="enlace-info-expandida">
                  <span className="enlace-titulo">{opcion.titulo}</span>
                  <span className="enlace-subtitulo">{opcion.descripcionCorta}</span>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Pie con indicador de pulso de estado */}
        <div className="barra-lateral-pie">
          <div
            className="indicador-pulso-wrap"
            onMouseEnter={(e) =>
              manejarMouseEnter(
                e,
                'Estado del Sistema',
                'Todos los servicios, enlaces SPA y módulos locales operando con normalidad.',
                '🛡️'
              )
            }
            onMouseLeave={manejarMouseLeave}
          >
            <span className="indicador-pulso" />
          </div>

          {estaExpandida && (
            <div className="pie-texto-expandido">
              <span className="pie-estado">Sistemas Activos</span>
              <span className="pie-info">TP2 · React SPA</span>
            </div>
          )}
        </div>
      </aside>

      {/* Tooltip flotante posicionado con respecto al viewport (inmune a clipping por overflow) */}
      {tooltipActivo && (
        <div
          className="tooltip-flotante-fijo"
          style={{
            top: `${tooltipActivo.top}px`,
            left: `${tooltipActivo.left}px`
          }}
          role="tooltip"
        >
          <div className="tooltip-header">
            <span>{tooltipActivo.icono}</span>
            <span>{tooltipActivo.titulo}</span>
          </div>
          <p className="tooltip-cuerpo">{tooltipActivo.descripcion}</p>
        </div>
      )}
    </>
  );
}
