import React, { useState, useMemo } from 'react';
import NodoArbol from '../componentes/arbol/NodoArbol';
import '../componentes/arbol/VistaArbol.css';

// Jerarquía real de componentes de la aplicación (Criterio 13)
const estructuraJerarquica = {
  name: 'App',
  tipo: 'raiz',
  icono: '⚛️',
  description: 'Componente raíz con BrowserRouter y definición central de rutas',
  children: [
    {
      name: 'ContenedorPrincipal',
      tipo: 'layout',
      icono: '📐',
      description: 'Estructura maestra compartida con soporte responsivo y telón móvil',
      children: [
        {
          name: 'BarraLateral',
          tipo: 'layout',
          icono: '🛡️',
          description: 'Navegación persistente estilo Gemini (modo colapsado/expandido y tooltips con position: fixed)',
          children: []
        },
        {
          name: 'BarraModoTactico',
          tipo: 'ui',
          icono: '⚡',
          description: 'Alternador accesible de alto contraste industrial (> 16:1) persistente en localStorage'
        },
        {
          name: 'SkipLinkTactico',
          tipo: 'ui',
          icono: '⇥',
          description: 'Enlace de salto directo al contenido principal para navegación accesible por teclado (WCAG 2.1)'
        },
        {
          name: 'Outlet',
          tipo: 'layout',
          icono: '🔀',
          description: 'Punto de inyección dinámico gestionado por React Router según la URL activa',
          children: [
            {
              name: 'PaginaInicio',
              tipo: 'pagina',
              icono: '🏠',
              description: 'Portada del equipo con métricas interactivas y presentación (Ruta: /)',
              children: [
                {
                  name: 'TarjetaIntegrante',
                  tipo: 'ui',
                  icono: '👤',
                  description: 'Tarjetas individuales de los 3 integrantes con enlace dinámico al perfil'
                },
                {
                  name: 'FormularioIncidenteSOC',
                  tipo: 'ui',
                  icono: '📋',
                  description: 'Canal de reporte y contacto SOC con validación reactiva y generación de tickets'
                }
              ]
            },
            {
              name: 'PaginaPerfil',
              tipo: 'pagina',
              icono: '📋',
              description: 'Detalle de integrante consumiendo parámetros de ruta (Ruta: /perfil/:id)',
              children: [
                {
                  name: 'DetalleIntegrante',
                  tipo: 'ui',
                  icono: '📑',
                  description: 'Ficha técnica con selector interactivo de pestañas (Stack, Cultura, TP2)'
                },
                {
                  name: 'ConsolaRolInteractiva',
                  tipo: 'ui',
                  icono: '🕹️',
                  description: 'Demostración de rol en vivo: auditoría de nodos, contraste accesible o sonda de red'
                }
              ]
            },
            {
              name: 'PaginaCapacidades',
              tipo: 'pagina',
              icono: '📦',
              description: 'Catálogo dinámico de 20 capacidades locales JSON (Ruta: /capacidades)',
              children: [
                {
                  name: 'BarraBusqueda',
                  tipo: 'ui',
                  icono: '🔍',
                  description: 'Input reactivo con filtrado por texto en vivo y botón de limpieza'
                },
                {
                  name: 'FiltroCategoria',
                  tipo: 'ui',
                  icono: '🏷️',
                  description: 'Selector dropdown por las 4 áreas temáticas del equipo'
                },
                {
                  name: 'TarjetaCapacidad',
                  tipo: 'ui',
                  icono: '🗂️',
                  description: 'Tarjeta individual con botón interactivo para desplegar especificaciones técnicas'
                }
              ]
            },
            {
              name: 'PaginaServicios',
              tipo: 'pagina',
              icono: '🌐',
              description: 'Consumo asíncrono de servicios externos públicos (Ruta: /servicios-api)',
              children: [
                {
                  name: 'SeccionServicios',
                  tipo: 'ui',
                  icono: '🗃️',
                  description: 'Contenedor con switch de pestañas para alternar fuentes de datos',
                  children: [
                    {
                      name: 'PestanaGithub',
                      tipo: 'servicio',
                      icono: '🐙',
                      description: 'Consulta en vivo a GitHub REST API con repositorios y botón de recarga'
                    },
                    {
                      name: 'PestanaHackerNews',
                      tipo: 'servicio',
                      icono: '📡',
                      description: 'Radar de tendencias tecnológicas vía Hacker News Firebase API'
                    },
                    {
                      name: 'Cargando',
                      tipo: 'ui',
                      icono: '⏳',
                      description: 'Componente reutilizable de feedback visual en estados de espera'
                    },
                    {
                      name: 'MensajeError',
                      tipo: 'ui',
                      icono: '⚠️',
                      description: 'Manejo explícito de fallos de red con botón de reintento interactivo'
                    }
                  ]
                }
              ]
            },
            {
              name: 'PaginaArbol',
              tipo: 'pagina',
              icono: '🌳',
              description: 'Esquema interactivo de auditoría arquitectónica de componentes (Ruta: /arquitectura)',
              children: [
                {
                  name: 'NodoArbol',
                  tipo: 'ui',
                  icono: '🌿',
                  description: 'Nodo recursivo con botones [+] y [−] para expandir y contraer ramas'
                }
              ]
            },
            {
              name: 'PaginaBitacora',
              tipo: 'pagina',
              icono: '📓',
              description: 'Registro cronológico y resolución de dificultades técnicas (Ruta: /bitacora)',
              children: [
                {
                  name: 'AcordeonBitacora',
                  tipo: 'ui',
                  icono: '🪗',
                  description: 'Entradas interactivas desplegables con filtros temáticos por categoría'
                }
              ]
            },
            {
              name: 'PaginaSimulaciones',
              tipo: 'pagina',
              icono: '🧪',
              description: 'Consola de simulaciones interactivas, modo táctico y despacho accesible (Ruta: /simulaciones)',
              children: [
                {
                  name: 'ConsolaRolInteractiva',
                  tipo: 'ui',
                  icono: '🕹️',
                  description: 'Simulador funcional de responsabilidades técnicas por integrante (Orlando, Adriana, Guillermo)'
                },
                {
                  name: 'FormularioIncidenteSOC',
                  tipo: 'ui',
                  icono: '📋',
                  description: 'Despacho de incidentes con validación reactiva y generación de tickets accesibles (role="status")'
                },
                {
                  name: 'BarraModoTactico',
                  tipo: 'ui',
                  icono: '⚡',
                  description: 'Alternador accesible de alto contraste industrial (> 16:1) persistente en localStorage'
                },
                {
                  name: 'SkipLinkTactico',
                  tipo: 'ui',
                  icono: '⇥',
                  description: 'Enlace de salto directo al contenido principal para navegación accesible por teclado (WCAG 2.1)'
                }
              ]
            },
            {
              name: 'PaginaNoEncontrada',
              tipo: 'pagina',
              icono: '🚫',
              description: 'Vista amigable para gestión de errores 404 internos (Ruta: *)',
              children: []
            }
          ]
        }
      ]
    }
  ]
};

// Función auxiliar para contar el número total de nodos en la jerarquía
function contarNodos(nodo) {
  let total = 1;
  if (nodo.children && nodo.children.length > 0) {
    for (const hijo of nodo.children) {
      total += contarNodos(hijo);
    }
  }
  return total;
}

export default function PaginaArbol() {
  const [expansionForzada, setExpansionForzada] = useState(null);

  const totalComponentes = useMemo(() => contarNodos(estructuraJerarquica), []);

  const handleExpandirTodo = () => {
    setExpansionForzada(true);
  };

  const handleContraerTodo = () => {
    setExpansionForzada(false);
  };

  return (
    <div className="pagina-arbol-contenedor">
      {/* Encabezado descriptivo */}
      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          color: '#38bdf8',
          fontSize: '0.82rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}>
          Arquitectura de Componentes · Criterio 13
        </span>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#f1f5f9' }}>
          Árbol de Renderizado de Componentes
        </h1>
        <p style={{ color: '#94a3b8', maxWidth: '820px', lineHeight: '1.65' }}>
          Representación interactiva de la jerarquía real del código de la aplicación.
          Muestra la relación entre el componente principal, layouts, páginas y componentes UI.
          Utiliza los controles individuales <strong>[+]</strong> y <strong>[−]</strong> o los botones globales para explorar la profundidad de la arquitectura.
        </p>
      </div>

      {/* Tarjeta del Árbol Interactivo */}
      <div className="contenedor-arbol-interactivo">
        {/* Barra superior de acciones y estadísticas */}
        <div className="barra-acciones-arbol">
          <div className="estadisticas-arbol">
            <span>
              Componentes mapeados: <strong className="contador-nodos">{totalComponentes}</strong>
            </span>
            <span style={{ color: '#475569' }}>|</span>
            <span style={{ fontSize: '0.8rem' }}>
              Nivel de logro: <strong style={{ color: '#34d399' }}>Propone</strong> (Árbol con expansión interactiva)
            </span>
          </div>

          <div className="botones-expansion-global">
            <button
              type="button"
              className="boton-accion-arbol"
              onClick={handleExpandirTodo}
            >
              ➕ Expandir todo
            </button>
            <button
              type="button"
              className="boton-accion-arbol"
              onClick={handleContraerTodo}
            >
              ➖ Contraer ramas
            </button>
          </div>
        </div>

        {/* Nodos interactivos del árbol */}
        <NodoArbol
          nodo={estructuraJerarquica}
          expansionForzada={expansionForzada}
        />
      </div>
    </div>
  );
}

