# Propuesta Alternativa de Diseño y Excelencia Técnica
## Inspirada en el benchmark de Eximia Code (Grupo 12) para "200 - OK · Ciberdefensa Industrial"

Este directorio contiene una **propuesta de diseño y componentes alternativos** desarrollada para el equipo **200 - OK (Grupo 2)**. Está inspirada en los puntos fuertes que le otorgaron la calificación más alta al proyecto de referencia (**Eximia Code · Grupo 12**), pero **adaptada de manera 100% original a nuestra temática de Ciberseguridad, Sistemas de Control Industrial (ICS/SCADA) y Command Center (SOC)**, sin copiar su paleta de colores verdes ni su dominio de logística.

---

## 📊 Matriz Comparativa: Eximia Code (TP1) vs. Propuesta 200 - OK (TP2)

| Eje de Evaluación | Cómo lo resolvió el Grupo 12 (Eximia Code) | Cómo lo supera nuestra Propuesta Alternativa (200 - OK) |
|---|---|---|
| **Paradigma Técnico** | Sitio estático multipágina (HTML5 + CSS + JS tradicional). | **Single Page Application (SPA) real en React** con React Router, sin recargas de página y con Virtual DOM. |
| **Interacción de Rol en Perfiles** | Botón genérico que cicla mensajes de texto del rol ("Listo para ejecutar demo"). | **`ConsolaRolInteractiva.jsx`**: Simulador técnico funcional con 3 modos reales (Auditoría de Nodos y SHA-256 para Orlando, Inspector WCAG 2.1 con ratios reales para Adriana, y Ping en vivo a APIs para Guillermo). |
| **Accesibilidad (A11y)** | Skip link tradicional y atributos ARIA básicos. | **`SkipLinkTactico.jsx`** con animación HUD, foco accesible de alto contraste (`--focus-ring`), y navegación por teclado en modales y pestañas. |
| **Alternador de Tema** | Modo Claro / Modo Oscuro estándar de oficina. | **`BarraModoTactico.jsx`**: Modo SOC Neón (predeterminado) vs. **Modo Táctico Industrial (Alto Contraste Ámbar > 16:1)**, simulando terminales SCADA de planta crítica. |
| **Contacto y Formularios** | Formulario de contacto tradicional vía FormSubmit. | **`FormularioIncidenteSOC.jsx`**: Despacho de incidentes con validación reactiva en vivo, selección de severidad y **generación dinámica de ticket con código de seguimiento (`role="status"`)**. |
| **Metadatos y SEO** | Metadatos Open Graph, Twitter Cards y Schema.org. | **`index-optimizado.html`**: Metadatos completos configurados con Open Graph, preloads de imagen de alta prioridad (LCP) y Schema.org EducationalOrganization. |
| **Bitácora y Metodología** | Resumen cronológico con "Hicimos / Decidimos / Resolvimos". | Estructura pedagógica integrada en los acordeones interactivos de la bitácora junto con la estimación con **Agile Planning Poker**. |

---

## 🛠️ Componentes Incluidos en esta Carpeta

### 1. `ConsolaRolInteractiva.jsx` (`componentes/ConsolaRolInteractiva.jsx`)
- **Propósito:** Dotar a cada perfil de integrante de una demostración técnica interactiva que prueba su rol en vivo.
- **Modos:**
  - **Orlando (Arquitectura y Datos):** Dispara una auditoría secuencial sobre los 20 registros locales del JSON, calcula latencia de renderizado virtual y verifica la integridad de rutas de la SPA.
  - **Adriana (Diseño UI/UX):** Permite seleccionar combinaciones de color de la paleta HUD y calcula matemáticamente en tiempo real la luminancia y el ratio de contraste contra los estándares WCAG AA y AAA.
  - **Guillermo (APIs y Red):** Ejecuta una sonda de red hacia GitHub REST API midiendo latencia real en milisegundos y verificando el estado de disponibilidad del gateway.

### 2. `FormularioIncidenteSOC.jsx` (`componentes/FormularioIncidenteSOC.jsx`)
- **Propósito:** Ofrecer un canal formal y accesible para reportar incidentes o contactar al colectivo técnico.
- **Características:**
  - Validación en vivo con mensajes de error asociados mediante `aria-describedby` y `aria-invalid`.
  - Generación instantánea de ticket (ej. `INC-2026-4891`) con sello de tiempo y confirmación accesible (`aria-live="polite"`).

### 3. `BarraModoTactico.jsx` (`componentes/BarraModoTactico.jsx` + `estilos/tokens-tacticos.css`)
- **Propósito:** Alternar entre la estética inmersiva nocturna (SOC Neón) y un modo de **Alto Contraste Táctico Industrial** para situaciones de alta luminosidad o usuarios con necesidades de contraste extremo.
- **Persistencia:** Guarda la elección en `localStorage` bajo la clave `'soc-tema-tactico'`.

### 4. `SkipLinkTactico.jsx` (`componentes/SkipLinkTactico.jsx`)
- **Propósito:** Cumplimiento estricto del Criterio 2.4.1 de WCAG (Bypass Blocks). Oculto visualmente, se hace visible arriba con resplandor cian al presionar `Tab`.

### 5. `index-optimizado.html`
- **Propósito:** Plantilla lista para usar en la raíz del proyecto que eleva la puntuación de Lighthouse y SEO al máximo nivel (Open Graph, Twitter Cards, Schema.org y preloads LCP).

---

## 🚀 Cómo Integrar estos Componentes al Proyecto Principal (Opcional)

Si el equipo decide activar estas mejoras en la aplicación principal, la integración es sumamente sencilla:

### Paso 1: Agregar la Consola de Rol en `PaginaPerfil.jsx`
Importar el componente en `src/paginas/PaginaPerfil.jsx`:
```jsx
import ConsolaRolInteractiva from '../../propuesta-alternativa/componentes/ConsolaRolInteractiva';

// Dentro del JSX de PaginaPerfil:
<ConsolaRolInteractiva integranteId={integrante.id} />
```

### Paso 2: Agregar el Formulario de Incidentes en `PaginaInicio.jsx`
Importar el formulario al final de `src/paginas/PaginaInicio.jsx`:
```jsx
import FormularioIncidenteSOC { default as FormularioIncidente } from '../../propuesta-alternativa/componentes/FormularioIncidenteSOC';

// Antes del cierre del contenedor principal:
<FormularioIncidente />
```

### Paso 3: Activar el Skip-Link en `ContenedorPrincipal.jsx`
Agregar al comienzo del layout en `src/componentes/estructura/ContenedorPrincipal.jsx`:
```jsx
import SkipLinkTactico from '../../../propuesta-alternativa/componentes/SkipLinkTactico';

// Primer elemento hijo del contenedor:
<SkipLinkTactico destinoId="contenido-operativo" />
```

---

## 🏆 Conclusión
Esta propuesta demuestra que no hace falta sacrificar la identidad oscura de ciberseguridad para tener un producto accesible, estructurado y de nivel universitario sobresaliente. Toma las mejores decisiones pedagógicas de la competencia y las supera mediante el potencial reactivo de React.

