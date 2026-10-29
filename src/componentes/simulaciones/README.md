# Módulo de Simulaciones Técnicas y Operaciones

Este directorio contiene los componentes del **módulo de simulaciones tácticas** del equipo **200 - OK (Grupo 2)**, integrados en la arquitectura de **Ciberseguridad, Sistemas de Control Industrial (ICS/SCADA) y Command Center (SOC)**.

---

## 🛠️ Componentes Incluidos en este Módulo

### 1. `ConsolaRolInteractiva.jsx`
- **Propósito:** Dotar a la aplicación de una demostración técnica reactiva que comprueba en vivo la responsabilidad técnica de cada integrante.
- **Modos:**
  - **Orlando (Arquitectura y Datos):** Dispara una auditoría secuencial sobre los 20 registros locales del JSON, calcula latencia de renderizado virtual y verifica la integridad de rutas de la SPA.
  - **Adriana (Diseño UI/UX):** Permite seleccionar combinaciones de color de la paleta HUD y calcula matemáticamente en tiempo real la luminancia y el ratio de contraste contra los estándares WCAG AA y AAA.
  - **Guillermo (APIs y Red):** Ejecuta una sonda de red hacia GitHub REST API midiendo latencia real en milisegundos y verificando el estado de disponibilidad del gateway.

### 2. `FormularioIncidenteSOC.jsx`
- **Propósito:** Ofrecer un canal formal y accesible para reportar incidentes o contactar al colectivo técnico.
- **Características:**
  - Validación en vivo con mensajes de error asociados mediante `aria-describedby` y `aria-invalid`.
  - Generación instantánea de ticket (ej. `INC-2026-4891`) con sello de tiempo y confirmación accesible (`aria-live="polite"`).

### 3. `BarraModoTactico.jsx`
- **Propósito:** Alternar entre la estética nocturna (SOC Neón) y un modo de **Alto Contraste Táctico Industrial** para situaciones de alta luminosidad o usuarios con necesidades de contraste extremo.
- **Persistencia:** Guarda la elección en `localStorage` bajo la clave `'soc-tema-tactico'`.

### 4. `SkipLinkTactico.jsx`
- **Propósito:** Cumplimiento estricto del Criterio 2.4.1 de WCAG (Bypass Blocks). Oculto visualmente, se hace visible arriba con resplandor cian al presionar `Tab`.

---

## 🚀 Integración en la Aplicación

Los componentes se importan directamente desde `src/componentes/simulaciones/`:

```jsx
import ConsolaRolInteractiva from '../componentes/simulaciones/ConsolaRolInteractiva';
import FormularioIncidenteSOC from '../componentes/simulaciones/FormularioIncidenteSOC';
import BarraModoTactico from '../componentes/simulaciones/BarraModoTactico';
import SkipLinkTactico from '../componentes/simulaciones/SkipLinkTactico';
```

