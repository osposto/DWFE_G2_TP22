# Despacho de Incidentes y Autorespuesta con Cloudflare Workers

Este Worker recibe los reportes del formulario web de la SPA en React y se encarga de:
1. **Notificar a tu correo** (`osposto@gmail.com`) con los detalles técnicos del incidente/consulta.
2. **Enviar una autorespuesta automática al visitante** con el código de seguimiento (ticket) y agradecimiento.

---

## 🚀 Pasos para desplegar en Cloudflare Dashboard (Toma 2 minutos)

### Paso 1: Crear el Worker en Cloudflare
1. Inicia sesión en [dash.cloudflare.com](https://dash.cloudflare.com/).
2. En el menú lateral izquierdo, haz clic en **Workers y Pages** (o *Workers & Pages*).
3. Haz clic en el botón azul **Crear aplicación** (*Create application*) y luego en **Crear Worker** (*Create Worker*).
4. Asígnale un nombre descriptivo, por ejemplo: `soc-despacho-incidentes`.
5. Haz clic en **Implementar** (*Deploy*).

---

### Paso 2: Pegar el código del Worker
1. En la pantalla del Worker recién creado, haz clic en **Editar código** (*Edit code*).
2. Borra todo el código de ejemplo predeterminado.
3. Copia y pega el contenido completo del archivo [`worker.js`](./worker.js).
4. Haz clic en **Implementar** (*Deploy*) arriba a la derecha.

---

### Paso 3: Configurar las Variables de Entorno (Secretos)
1. Vuelve a la página principal de tu Worker y entra en la pestaña **Configuración** (*Settings*).
2. Selecciona la opción **Variables y secretos** (*Variables and Secrets*).
3. Haz clic en **Agregar** (*Add*) y crea las siguientes variables:

| Variable | Tipo | Valor |
|---|---|---|
| `RESEND_API_KEY` | **Secret** (Encriptada) | Tu clave de Resend (guardada en tu `.env`) |
| `NOTIFY_EMAIL` | Texto | `osposto@gmail.com` |
| `FROM_EMAIL` | Texto *(opcional)* | `200 - OK SOC <onboarding@resend.dev>` |

4. Guarda los cambios (*Save and deploy*).

---

### Paso 4: Obtener la URL del Worker y conectarla a React
1. En la parte superior del Worker verás su URL pública, que tendrá este formato:
   ```text
   https://soc-despacho-incidentes.<tu-subdominio>.workers.dev
   ```
2. Copia esa URL y colócala en tu archivo `.env` del proyecto React:
   ```env
   VITE_WORKER_URL=https://soc-despacho-incidentes.<tu-subdominio>.workers.dev
   ```
3. Si el sitio está en Vercel, agrega también `VITE_WORKER_URL` en las **Environment Variables** del proyecto en Vercel.

