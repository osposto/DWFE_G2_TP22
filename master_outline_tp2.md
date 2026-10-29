# MASTER OUTLINE: TP2 - Proyecto React en Equipo

Este documento centraliza los requerimientos, la arquitectura de módulos en español, la asignación de responsabilidades entre los 3 integrantes y los contratos de componentes para el **Trabajo Práctico Grupal 2 (React)**. Sirve como hoja de ruta técnica y organizativa para alcanzar el nivel **"Propone"** en todos los criterios y **"Supera"** en la propuesta estética, permitiendo el desarrollo independiente y la integración directa de cada parte.

---

## 1. Identidad del Equipo y Visión General
- **Perfil del Equipo:** Estudio y colectivo de ingeniería de software especializado en **Ciberseguridad, Ciberdefensa, Sistemas de Control Industrial (ICS/SCADA), Sistemas Embebidos y Respuesta ante Ciberataques (SOC / Command Center)**.
- **Concepto Visual y Temática Base:** Toda la estética y narrativa visual de la aplicación se articula en torno a la imagen de fondo técnica (`fondo-sitio.jpeg`), inspirada en operaciones de ciberseguridad industrial, monitoreo de incidentes críticos (Stuxnet, ransomware, sabotaje de centrifugadoras ICS), mapas globales de vectores de ataque y consolas de telemetría en tiempo real.
- **Objetivo de la Aplicación:** Migrar y expandir el proyecto del TP1 hacia una Single Page Application (SPA) en **React**, gobernada por una navegación lateral persistente (**BarraLateral**), datos locales dinámicos, integración asíncrona de servicios web externos y documentación interactiva.
- **Lineamiento de Estilos:** **CSS nativo estructurado** (archivos `.css` modulares o estándar, variables CSS en `:root`, Flexbox y CSS Grid). **No se utiliza Tailwind ni ningún framework de utilidades.**
- **Enfoque de IA:** Asistencia documentada en diseño, arquitectura de componentes, debugging y redacción técnica, manteniendo control estricto de autoría por parte del equipo.

---

## 2. Checklist y Matriz de los 15 Criterios de Evaluación

| # | Criterio | Nivel Objetivo | Integrante Responsable | Especificación Requerida para Máximo Logro |
|---|---|---|---|---|
| **01** | **Repositorio y publicación** | `Propone` | Orlando S. | Repositorio público independiente para TP2 en GitHub. Despliegue en Vercel verificable sin login. El repo incluye descripción y enlace directo al sitio web en su cabecera. |
| **02** | **README obligatorio** | `Propone` | Guillermo | Descripción completa, URL al deploy funcional, nombres de todos los integrantes con links a sus perfiles de GitHub, índice con enlaces internos y capturas de pantalla de la interfaz. |
| **03** | **Integrantes con acceso** | `Propone` | Guillermo | Todos los integrantes con invitaciones aceptadas en GitHub. El README detalla con precisión el rol y la responsabilidad técnica asumida por cada persona. |
| **04** | **Proyecto en React** | `Propone` | Orlando S. | Aplicación desarrollada en React mediante componentes. Reutilización sistemática de componentes mediante paso de `props` (tarjetas, botones de estado, filtros, nodos). |
| **05** | **Sidebar compartida** | `Propone` | Orlando S. | Menú lateral presente en toda la navegación con la identidad visual del equipo, sección activa destacada visualmente (`NavLink`) y versión móvil responsiva tipo panel colapsable (drawer/off-canvas con botón de apertura/cierre). |
| **06** | **Navegación completa** | `Propone` | Orlando S. | Enrutamiento gestionado con React Router. Ninguna vista depende del botón Atrás del navegador. Archivo `vercel.json` configurado para permitir recargar directamente cualquier URL interna sin arrojar error 404. |
| **07** | **Portada del equipo** | `Propone` | Adriana | Presentación del colectivo (propósito, identidad técnica). Elementos visuales interactivos y accesos directos dinámicos hacia los perfiles de los integrantes. |
| **08** | **Perfiles dentro de React** | `Propone` | Adriana | Un perfil por integrante dentro de la aplicación React (sin enlaces externos al TP1). Cada perfil incorpora una interacción funcional real sobre su propio contenido (selector interactivo de pestañas). |
| **09** | **Propuesta estética** | `Supera` | Adriana | Identidad visual integral y personalizada: paleta cromática armónica, tipografías estructuradas, composición prolija y coherencia gráfica entre todas las vistas. Recursos visuales adaptados o generados ex profeso para el proyecto. |
| **10** | **Datos locales JSON** | `Propone` | Orlando S. | Archivo JSON local con al menos 20 registros vinculados a la propuesta técnica (`capacidades.json`). Renderizado dinámico con funcionalidad para desplegar información técnica detallada por cada registro. |
| **11** | **Búsqueda y filtro** | `Propone` | Orlando S. | Búsqueda por texto en tiempo real y filtro desplegable por categoría sobre los datos locales. Manejo de estado vacío ("Sin resultados") y botón funcional para restablecer la lista completa. |
| **12** | **API pública y estados** | `Propone` | Guillermo | Integración asíncrona de 2 APIs públicas mediante sistema de pestañas (GitHub API y Hacker News API). Explicación contextual de los datos, manejo explícito de carga (*loading*) y fallo (*error*), y controles interactivos para reintentar o actualizar la consulta. |
| **13** | **Árbol de renderizado** | `Propone` | Orlando S. | Representación interactiva de la jerarquía real de componentes de la aplicación. Permite expandir y contraer sus nodos para auditar la arquitectura del código. |
| **14** | **Bitácora** | `Propone` | Guillermo | Sección con registros del proceso de desarrollo y transición desde el TP1. Presentación interactiva mediante acordeones colapsables o filtros por categoría/hito. |
| **15** | **Declaración de uso de IA** | `Propone` | Guillermo | Registro pormenorizado en el README identificando, por integrante: aplicación, modelo específico empleado y tareas o contenidos precisos donde intervino. |

---

## 3. Arquitectura del Proyecto y Árbol de Ficheros (en Español)

Estructura estandarizada con nombres en español para garantizar que los módulos desarrollados por cada integrante se integren de forma directa:

```text
DWFE_G2_TP22/
├── public/
│   ├── datos/
│   │   └── capacidades.json             # 20 registros del catálogo técnico
│   └── imagenes/
│       └── fondo-sitio.jpeg             # Imagen de fondo base de la temática (Ciberseguridad / SOC)
├── src/
│   ├── assets/                          # Recursos gráficos (avatares, logos, fondo-sitio.jpeg)
│   ├── componentes/
│   │   ├── comunes/
│   │   │   ├── Cargando.jsx             # Componente de estado de carga
│   │   │   └── MensajeError.jsx         # Componente de error con reintento
│   │   ├── estructura/
│   │   │   ├── ContenedorPrincipal.jsx  # Layout maestro (BarraLateral + Outlet)
│   │   │   ├── ContenedorPrincipal.css
│   │   │   ├── BarraLateral.jsx         # Menú lateral persistente + drawer móvil
│   │   │   └── BarraLateral.css
│   │   ├── integrantes/
│   │   │   ├── TarjetaIntegrante.jsx    # Tarjeta resumida para portada
│   │   │   └── DetalleIntegrante.jsx    # Vista de perfil con pestañas interactivas
│   │   ├── datos-locales/
│   │   │   ├── BarraBusqueda.jsx        # Input de búsqueda reactiva por texto
│   │   │   ├── FiltroCategoria.jsx      # Selector desplegable de categorías
│   │   │   ├── TarjetaCapacidad.jsx     # Tarjeta con panel desplegable de detalle
│   │   │   └── DatosLocales.css
│   │   ├── servicios/
│   │   │   ├── SeccionServicios.jsx     # Contenedor con alternador de pestañas
│   │   │   ├── PestanaGithub.jsx        # Consulta asíncrona a GitHub REST API
│   │   │   ├── PestanaHackerNews.jsx    # Radar de tendencias vía Hacker News API
│   │   │   └── SeccionServicios.css
│   │   └── arbol/
│   │       ├── NodoArbol.jsx            # Nodo colapsable/expandible del árbol
│   │       └── VistaArbol.css
│   ├── datos/
│   │   ├── datosIntegrantes.js          # Información de los 3 integrantes
│   │   ├── datosBitacora.js             # Hitos y registros de trabajo del equipo
│   │   └── capacidades.json             # Copia local para importación directa
│   ├── paginas/
│   │   ├── PaginaInicio.jsx             # Portada y presentación del equipo
│   │   ├── PaginaPerfil.jsx             # Vista dinámica de perfil (/perfil/:id)
│   │   ├── PaginaCapacidades.jsx        # Catálogo local con buscador y filtros
│   │   ├── PaginaServicios.jsx          # Vista de servicios externos (GitHub + HN)
│   │   ├── PaginaArbol.jsx              # Esquema interactivo de componentes
│   │   ├── PaginaBitacora.jsx           # Registro del proceso con acordeones
│   │   └── PaginaNoEncontrada.jsx       # Vista 404 amigable
│   ├── estilos/
│   │   ├── variables.css                # Paleta, fuentes, medidas y tokens (:root)
│   │   └── global.css                   # Resets y layout base
│   ├── App.jsx                          # Enrutador central (React Router)
│   └── main.jsx                         # Punto de entrada de React
├── vercel.json                          # Reglas de reescritura para rutas SPA
├── package.json
└── README.md                            # Documentación obligatoria del proyecto
```

> **Configuración para Vercel (`vercel.json`):**
> ```json
> {
>   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
> }
> ```

---

## 4. División de Tareas y Contratos de Integración Directa

Para que el trabajo independiente de cada integrante encaje de manera inmediata al fusionar ramas o archivos, se fijan los siguientes nombres de componentes, rutas y contratos de props:

### 4.1. Responsable 1: Orlando S. (Arquitectura, Estructura y Datos Locales)
* **Objetivo:** Garantizar la base del sistema, el enrutador, el menú persistente, el catálogo JSON y el árbol interactivo.
* **Archivos asignados:**
  - `vercel.json`
  - `src/App.jsx`
  - `src/componentes/estructura/ContenedorPrincipal.jsx` y `ContenedorPrincipal.css`
  - `src/componentes/estructura/BarraLateral.jsx` y `BarraLateral.css`
  - `src/componentes/datos-locales/BarraBusqueda.jsx`
  - `src/componentes/datos-locales/FiltroCategoria.jsx`
  - `src/componentes/datos-locales/TarjetaCapacidad.jsx`
  - `src/componentes/datos-locales/DatosLocales.css`
  - `src/paginas/PaginaCapacidades.jsx`
  - `src/componentes/arbol/NodoArbol.jsx` y `VistaArbol.css`
  - `src/paginas/PaginaArbol.jsx`
  - `src/paginas/PaginaNoEncontrada.jsx`
* **Contratos fijados:**
  - `<BarraLateral estaAbierta={boolean} alCerrar={fn} />`
  - `<BarraBusqueda valor={string} alCambiar={fn} />`
  - `<FiltroCategoria categorias={array} seleccionada={string} alCambiar={fn} />`
  - `<TarjetaCapacidad item={objeto} />` (contiene botón interno para expandir detalles)
  - `<NodoArbol nodo={objeto} />` (contiene lógica interna para expandir/contraer ramas)
  - **Rutas asociadas:** `/capacidades`, `/arquitectura`, `*`

### 4.2. Responsable 2: Adriana (Diseño UI/UX, Portada y Perfiles)
* **Objetivo:** Garantizar la identidad gráfica de nivel "Supera", alineada con la temática de ciberseguridad industrial y el fondo visual (`fondo-sitio.jpeg`), la presentación atractiva del equipo y las fichas de integrantes con interacción dinámica.
* **Pautas de Diseño y Paleta Temática (Criterio 09 - Nivel Supera):**
  - **Fondo General del Sitio:** Fijado globalmente sobre `body` con la imagen `/imagenes/fondo-sitio.jpeg` y una sobrecapa (overlay) oscura semitransparente con gradiente para garantizar contraste y legibilidad impecables.
  - **Paleta de Color en `variables.css`:**
    - Fondo de paneles y tarjetas: `rgba(10, 17, 30, 0.85)` con `backdrop-filter: blur(10px)` (efecto vidrio esmerilado / glassmorphism técnico).
    - Bordes de tarjetas y contenedores: `rgba(56, 189, 248, 0.2)` con brillo sutil en hover.
    - Acento primario (radar cian / HUD): `#00f0ff` y `#38bdf8`.
    - Acento de advertencia industrial (hazard / radiación): `#f59e0b` y `#fbbf24`.
    - Acento de alerta crítica: `#ef4444` y `#ff2a4b`.
    - Acento de estado seguro / terminal: `#10b981`.
  - **Tipografía:** `'Inter'` para textos de lectura y `'JetBrains Mono'` / `'Fira Code'` para códigos, badges técnicos y métricas.
* **Archivos asignados:**
  - `src/estilos/variables.css` (variables CSS `:root`: paleta, fuentes, gradientes, radios, sombras)
  - `src/estilos/global.css` (estilos base globales)
  - `src/datos/datosIntegrantes.js` (array con los 3 integrantes del equipo)
  - `src/componentes/integrantes/TarjetaIntegrante.jsx`
  - `src/componentes/integrantes/DetalleIntegrante.jsx`
  - `src/paginas/PaginaInicio.jsx`
  - `src/paginas/PaginaPerfil.jsx`
* **Contratos fijados:**
  - **Estructura de cada integrante en `datosIntegrantes.js`:**
    ```javascript
    {
      id: "orlando" | "adriana" | "guillermo",
      nombre: string,
      rol: string,
      ciudad: string,
      avatar: string,
      github: string,
      githubUser: string,
      bio: string,
      tecnologias: string[],
      habilidades: string[],
      gustosCulturales: { musica: string, cine: string, libro: string },
      responsabilidades: string
    }
    ```
  - `<TarjetaIntegrante integrante={objeto} />` (enlace interno `<Link to={'/perfil/' + integrante.id}>`)
  - `<DetalleIntegrante integrante={objeto} />` (selector de pestañas interactivo para Stack / Cultura / Responsabilidad)
  - `<PaginaInicio />` (Hero + panel interactivo de estadísticas + grilla de tarjetas)
  - `<PaginaPerfil />` (consume `useParams().id` para buscar el integrante y renderizar su detalle)
  - **Rutas asociadas:** `/`, `/perfil/:id`

### 4.3. Responsable 3: Guillermo (Servicios Asíncronos, Bitácora y Documentación)
* **Objetivo:** Garantizar el consumo asíncrono robusto de 2 APIs públicas con manejo de estados, la bitácora interactiva y el README oficial.
* **Archivos asignados:**
  - `src/componentes/comunes/Cargando.jsx`
  - `src/componentes/comunes/MensajeError.jsx`
  - `src/componentes/servicios/SeccionServicios.jsx` y `SeccionServicios.css`
  - `src/componentes/servicios/PestanaGithub.jsx`
  - `src/componentes/servicios/PestanaHackerNews.jsx`
  - `src/datos/datosBitacora.js` (array con los hitos del proyecto y autores)
  - `src/paginas/PaginaServicios.jsx`
  - `src/paginas/PaginaBitacora.jsx`
  - `README.md`
* **Contratos fijados:**
  - `<Cargando mensaje={string} />` (reutilizable en cualquier petición asíncrona)
  - `<MensajeError mensaje={string} alReintentar={fn} />` (reutilizable ante fallos de conexión)
  - `<SeccionServicios />` (contiene selector de pestañas para GitHub y Hacker News)
  - `<PestanaGithub usuario={string} />` (consume GitHub REST API con loading/error/recarga)
  - `<PestanaHackerNews />` (consume Hacker News Firebase API con loading/error/recarga)
  - `<PaginaBitacora />` (acordeones interactivos colapsables con filtro de categorías)
  - **Estructura de cada entrada en `datosBitacora.js`:**
    ```javascript
    {
      id: string,
      fecha: string,
      titulo: string,
      autor: "Orlando S." | "Adriana" | "Guillermo",
      categoria: string,
      resumen: string,
      detalle: string,
      aprendizajes: string
    }
    ```
  - **Rutas asociadas:** `/servicios-api`, `/bitacora`

---

## 5. Tabla de Rutas de la SPA (`App.jsx`)

El archivo `App.jsx` actúa como integrador central conectando la estructura y las vistas creadas por los 3 integrantes:

| Ruta | Componente de Página | Responsable de Desarrollo | Descripción de la Vista |
|---|---|---|---|
| `/` | `<PaginaInicio />` | Adriana | Portada colectiva del equipo, métricas y accesos a perfiles |
| `/perfil/:id` | `<PaginaPerfil />` | Adriana | Ficha individual interactiva por parámetros de ruta |
| `/capacidades` | `<PaginaCapacidades />` | Orlando S. | Catálogo de datos locales JSON con búsqueda y filtros |
| `/servicios-api` | `<PaginaServicios />` | Guillermo | Servicios externos asíncronos (GitHub y Hacker News en tabs) |
| `/arquitectura` | `<PaginaArbol />` | Orlando S. | Árbol interactivo de componentes colapsable/expandible |
| `/bitacora` | `<PaginaBitacora />` | Guillermo | Diario de desarrollo interactivo con acordeones |
| `*` | `<PaginaNoEncontrada />` | Orlando S. | Vista 404 amigable para rutas inexistentes |

---

## 6. Fases de Coordinación e Integración

1. **Fase 1: Preparación (Orlando)**
   - Establecer el sistema de rutas en `src/App.jsx` y la estructura `ContenedorPrincipal` + `BarraLateral`.
   - Ubicar `capacidades.json` en `public/datos/` y `src/datos/`.
2. **Fase 2: Identidad y Perfiles (Adriana)**
   - Definir `variables.css` y `global.css`.
   - Completar `datosIntegrantes.js`, `TarjetaIntegrante`, `DetalleIntegrante`, `PaginaInicio` y `PaginaPerfil`.
3. **Fase 3: Servicios y Documentación (Guillermo)**
   - Desarrollar `Cargando`, `MensajeError`, `PestanaGithub`, `PestanaHackerNews`, `SeccionServicios`, `PaginaServicios` y `PaginaBitacora`.
   - Redactar exhaustivamente el `README.md` reflejando las contribuciones y la tabla de uso de IA.
4. **Fase 4: Integración y Verificación Conjunta (Equipo)**
   - Comprobar que todas las rutas se abren y recargan en Vercel sin error 404.
   - Auditoría de los 15 criterios de la consigna.
