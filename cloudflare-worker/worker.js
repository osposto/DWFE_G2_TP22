/**
 * Cloudflare Worker: Despacho de Incidentes y Autorespuesta
 * Proyecto: 200 - OK · Centro de Operaciones y Ciberdefensa
 *
 * Módulo de Seguridad:
 * - Rate Limiting por IP (Máx. 3 envíos cada 10 min por IP)
 * - Protección Antispam / Anti-Bombing por correo destinatario (Máx. 2 autorespuestas cada 15 min al mismo email)
 * - Restricción de Origen (CORS) para Vercel y Localhost
 * - Sanitización y validación estricta de campos
 *
 * Variables de entorno requeridas en Cloudflare:
 * - RESEND_API_KEY: Clave de API de Resend (secreta)
 * - NOTIFY_EMAIL: Casilla de destino del administrador (ej: osposto@gmail.com)
 * - FROM_EMAIL: Remitente verificado (ej: "200 - OK SOC <notificaciones@soc.mastercode.net.ar>")
 */

// Tablas en memoria para control de tasa (Rate Limiting)
const registroIp = new Map();
const registroCorreos = new Map();

// Orígenes permitidos (CORS)
const ORIGENES_PERMITIDOS = [
  "https://dwfe-g2-tp-2.vercel.app",
  "https://dwfe-g2-tp22.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173",
];

function esOrigenPermitido(origen) {
  if (!origen) return false;
  if (ORIGENES_PERMITIDOS.includes(origen)) return true;
  // Permitir previews de Vercel y dominios de mastercode.net.ar
  if (origen.endsWith(".vercel.app")) return true;
  if (origen.endsWith("mastercode.net.ar")) return true;
  return false;
}

function obtenerCabecerasCors(origen) {
  const origenValido = esOrigenPermitido(origen) ? origen : "https://dwfe-g2-tp-2.vercel.app";
  return {
    "Access-Control-Allow-Origin": origenValido,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Limpiador periódico de memoria para evitar fugas
function limpiarRegistrosExpirados() {
  const ahora = Date.now();
  for (const [clave, valor] of registroIp.entries()) {
    if (ahora > valor.expiraEn) registroIp.delete(clave);
  }
  for (const [clave, valor] of registroCorreos.entries()) {
    if (ahora > valor.expiraEn) registroCorreos.delete(clave);
  }
}

export default {
  async fetch(request, env) {
    limpiarRegistrosExpirados();

    const origen = request.headers.get("Origin");
    const cabecerasCors = obtenerCabecerasCors(origen);

    // 1. Manejo de CORS (Preflight OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: cabecerasCors,
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Método no permitido. Use POST." }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...cabecerasCors },
      });
    }

    try {
      // 2. Control de Tasa (Rate Limiting) por Dirección IP
      const ipCliente = request.headers.get("CF-Connecting-IP") || "anonimo";
      const ahora = Date.now();
      const ventanaTiempoIp = 10 * 60 * 1000; // 10 minutos
      const maxEnviosPorIp = 3; // Máximo 3 envíos cada 10 minutos

      const datosIp = registroIp.get(ipCliente) || { contador: 0, expiraEn: ahora + ventanaTiempoIp };

      if (ahora > datosIp.expiraEn) {
        datosIp.contador = 0;
        datosIp.expiraEn = ahora + ventanaTiempoIp;
      }

      if (datosIp.contador >= maxEnviosPorIp) {
        const minutosRestantes = Math.ceil((datosIp.expiraEn - ahora) / 60000);
        return new Response(
          JSON.stringify({
            ok: false,
            error: `Límite de solicitudes alcanzado. Por política de seguridad del SOC, se permiten máximo ${maxEnviosPorIp} envíos cada 10 minutos. Intente nuevamente en ${minutosRestantes} minuto(s).`,
          }),
          {
            status: 429,
            headers: { "Content-Type": "application/json", ...cabecerasCors },
          }
        );
      }

      // 3. Parseo y Validación de Datos
      const cuerpo = await request.json();
      let {
        nombreOperador = "Visitante",
        correoContacto,
        nivelCriticidad = "media",
        sectorAfectado = "Consulta general",
        descripcion = "",
      } = cuerpo;

      nombreOperador = String(nombreOperador).trim().substring(0, 100);
      correoContacto = String(correoContacto || "").trim().toLowerCase();
      descripcion = String(descripcion).trim().substring(0, 3000);
      sectorAfectado = String(sectorAfectado).trim().substring(0, 100);

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoContacto || !regexEmail.test(correoContacto)) {
        return new Response(
          JSON.stringify({ ok: false, error: "La dirección de correo electrónico no es válida." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...cabecerasCors },
          }
        );
      }

      if (!descripcion || descripcion.length < 5) {
        return new Response(
          JSON.stringify({ ok: false, error: "La descripción del reporte debe tener al menos 5 caracteres." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...cabecerasCors },
          }
        );
      }

      // Incrementar contador de la IP
      datosIp.contador += 1;
      registroIp.set(ipCliente, datosIp);

      // 4. Protección contra bombardeo al correo del destinatario (Anti-Spam Autoresponder)
      const ventanaCorreo = 15 * 60 * 1000; // 15 minutos
      const datosCorreo = registroCorreos.get(correoContacto) || { contador: 0, expiraEn: ahora + ventanaCorreo };

      if (ahora > datosCorreo.expiraEn) {
        datosCorreo.contador = 0;
        datosCorreo.expiraEn = ahora + ventanaCorreo;
      }

      const permitirAutorespuesta = datosCorreo.contador < 2; // Máximo 2 autorespuestas al mismo correo cada 15 min
      if (permitirAutorespuesta) {
        datosCorreo.contador += 1;
        registroCorreos.set(correoContacto, datosCorreo);
      }

      // 5. Configuración de Credenciales
      const ticketId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });

      const resendApiKey = env.RESEND_API_KEY;
      const destinoAdmin = env.NOTIFY_EMAIL || "osposto@gmail.com";
      const remitente = env.FROM_EMAIL || "200 - OK SOC <notificaciones@soc.mastercode.net.ar>";

      if (!resendApiKey) {
        throw new Error("RESEND_API_KEY no está configurada en Cloudflare.");
      }

      // ====================================================================
      // 6. ENVÍO AL ADMINISTRADOR (Orlando)
      // ====================================================================
      const colorSeveridad =
        nivelCriticidad === "critica" ? "#ef4444" :
        nivelCriticidad === "alta" ? "#f97316" :
        nivelCriticidad === "media" ? "#00f0ff" : "#10b981";

      const respAdmin = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: remitente,
          to: [destinoAdmin],
          reply_to: correoContacto,
          subject: `🚨 [SOC 200 - OK] ${ticketId} · ${sectorAfectado} (${nivelCriticidad.toUpperCase()})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060a12; color: #f1f5f9; padding: 28px; border-radius: 8px; max-width: 620px; margin: 0 auto; border: 1px solid #1e293b;">
              <div style="border-bottom: 2px solid ${colorSeveridad}; padding-bottom: 14px; margin-bottom: 20px;">
                <span style="font-size: 11px; font-weight: 700; color: ${colorSeveridad}; letter-spacing: 0.1em; text-transform: uppercase;">ALERTA DE DESPACHO · SOC 200 - OK</span>
                <h2 style="margin: 6px 0 0; color: #f8fafc; font-size: 22px;">Nuevo Reporte Operativo: ${ticketId}</h2>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Remitente:</strong></td>
                  <td style="padding: 8px 0; color: #f1f5f9;">${nombreOperador} &lt;<a href="mailto:${correoContacto}" style="color: #00f0ff; text-decoration: none;">${correoContacto}</a>&gt;</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Sector / Tipo:</strong></td>
                  <td style="padding: 8px 0; color: #f1f5f9;">${sectorAfectado}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Severidad:</strong></td>
                  <td style="padding: 8px 0;"><span style="background: rgba(239,68,68,0.2); color: ${colorSeveridad}; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 12px;">${nivelCriticidad.toUpperCase()}</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #1e293b;">
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>IP de Origen:</strong></td>
                  <td style="padding: 8px 0; color: #64748b; font-family: monospace;">${ipCliente}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;"><strong>Fecha y Hora:</strong></td>
                  <td style="padding: 8px 0; color: #f1f5f9;">${timestamp} (ARG)</td>
                </tr>
              </table>

              <div style="background: #0b1220; padding: 18px; border-radius: 6px; border-left: 4px solid #00f0ff; margin-bottom: 22px;">
                <h4 style="margin: 0 0 10px; color: #94a3b8; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase;">Detalle del Mensaje:</h4>
                <p style="margin: 0; color: #f8fafc; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${descripcion}</p>
              </div>

              <div style="text-align: center; padding-top: 10px; border-top: 1px solid #1e293b; color: #64748b; font-size: 12px;">
                Plataforma de Ciberdefensa Industrial · TP2 React v2
              </div>
            </div>
          `,
        }),
      });

      if (!respAdmin.ok) {
        const errorAdmin = await respAdmin.text();
        console.error("Fallo al enviar correo al administrador:", errorAdmin);
      }

      // ====================================================================
      // 7. ENVÍO DE AUTORESPUESTA AL VISITANTE (Con filtro antispam)
      // ====================================================================
      let estadoAutorespuesta = "omitido_por_frecuencia";

      if (permitirAutorespuesta) {
        try {
          const respVisitante = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: remitente,
              to: [correoContacto],
              subject: `✓ [${ticketId}] Confirmación de consulta · Centro de Operaciones 200 - OK`,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #060a12; color: #f1f5f9; padding: 32px 24px; border-radius: 8px; max-width: 580px; margin: 0 auto; border: 1px solid rgba(56,189,248,0.25);">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <span style="font-size: 32px;">🛡️</span>
                    <h2 style="margin: 8px 0 4px; color: #00f0ff; font-size: 20px; font-weight: 700; letter-spacing: 0.05em;">200 - OK · CENTRO DE OPERACIONES</h2>
                    <p style="margin: 0; color: #94a3b8; font-size: 13px;">Ciberdefensa Industrial &amp; Arquitectura de Software</p>
                  </div>

                  <p style="font-size: 15px; line-height: 1.6; margin-bottom: 16px;">
                    Hola <strong>${nombreOperador}</strong>,
                  </p>

                  <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px;">
                    Agradecemos tu visita a nuestro portal. Hemos registrado correctamente tu comunicación en nuestra consola y asignamos el siguiente código de seguimiento:
                  </p>

                  <div style="background: #0b1220; border: 1px dashed #00f0ff; padding: 18px; border-radius: 6px; text-align: center; margin: 20px 0;">
                    <span style="color: #94a3b8; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">CÓDIGO DE INCIDENTE / CONSULTA</span>
                    <strong style="color: #00f0ff; font-size: 24px; font-family: 'Courier New', monospace; letter-spacing: 0.08em;">${ticketId}</strong>
                    <span style="color: #64748b; font-size: 12px; display: block; margin-top: 6px;">Sector asignado: ${sectorAfectado}</span>
                  </div>

                  <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px;">
                    Tu mensaje ha sido derivado a los responsables del área técnica. A la brevedad te responderemos directamente a esta casilla de correo.
                  </p>

                  <div style="background: rgba(15,23,42,0.6); padding: 14px 18px; border-radius: 6px; border-left: 3px solid #10b981; margin-top: 24px;">
                    <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                      <strong style="color: #10b981;">Estado:</strong> Pendiente de respuesta operativa.<br />
                      <strong>Coordinación:</strong> Orlando Sposto, Adriana Van Den Dooren, Guillermo Escobar.
                    </p>
                  </div>

                  <div style="text-align: center; padding-top: 24px; margin-top: 28px; border-top: 1px solid #1e293b; color: #64748b; font-size: 11px;">
                    Mensaje generado automáticamente por el sistema de despacho 200 - OK SOC.<br />
                    Solicitud originada el ${timestamp}. Si usted no realizó esta consulta, desestime este mensaje.
                  </div>
                </div>
              `,
            }),
          });

          if (respVisitante.ok) {
            estadoAutorespuesta = "enviado";
          } else {
            const detalleError = await respVisitante.json();
            estadoAutorespuesta = `aviso_resend: ${detalleError.message || "Pendiente de verificación de dominio"}`;
          }
        } catch (err) {
          estadoAutorespuesta = `error: ${err.message}`;
        }
      }

      // 8. Respuesta hacia el Frontend
      return new Response(
        JSON.stringify({
          ok: true,
          ticketId,
          timestamp,
          operador: nombreOperador,
          correo: correoContacto,
          sector: sectorAfectado,
          criticidad: nivelCriticidad,
          autorespuesta: estadoAutorespuesta,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...cabecerasCors,
          },
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error.message || "Error interno al procesar el despacho",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...cabecerasCors,
          },
        }
      );
    }
  },
};
