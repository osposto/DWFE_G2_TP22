/**
 * Cloudflare Worker: Despacho de Incidentes y Autorespuesta
 * Proyecto: 200 - OK · Centro de Operaciones y Ciberdefensa
 *
 * Variables de entorno requeridas en Cloudflare:
 * - RESEND_API_KEY: Clave de API de Resend (secreta)
 * - NOTIFY_EMAIL: Casilla de destino del administrador (ej: osposto@gmail.com)
 * - FROM_EMAIL: Remitente verificado (ej: "200 - OK SOC <onboarding@resend.dev>" o tu dominio)
 */

export default {
  async fetch(request, env) {
    // 1. Manejo de CORS (Preflight OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Método no permitido. Use POST." }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    try {
      const cuerpo = await request.json();
      const {
        nombreOperador = "Visitante",
        correoContacto,
        nivelCriticidad = "media",
        sectorAfectado = "Consulta general",
        descripcion = "",
      } = cuerpo;

      if (!correoContacto || !descripcion) {
        return new Response(
          JSON.stringify({ error: "El correo y la descripción son campos requeridos." }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      // Generar identificador único de ticket
      const ticketId = `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });

      const resendApiKey = env.RESEND_API_KEY;
      const destinoAdmin = env.NOTIFY_EMAIL || "osposto@gmail.com";
      const remitente = env.FROM_EMAIL || "200 - OK SOC <onboarding@resend.dev>";

      if (!resendApiKey) {
        throw new Error("RESEND_API_KEY no está configurada en las variables de entorno de Cloudflare.");
      }

      // ====================================================================
      // 1. ENVÍO AL ADMINISTRADOR (Orlando)
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
      // 2. ENVÍO DE AUTORESPUESTA AL VISITANTE
      // ====================================================================
      let estadoAutorespuesta = "enviado";

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
                  Por favor, no responda directamente a este correo automático.
                </div>
              </div>
            `,
          }),
        });

        if (!respVisitante.ok) {
          const detalleError = await respVisitante.json();
          estadoAutorespuesta = `aviso_dominio: ${detalleError.message || "Requiere dominio verificado en Resend para destinatarios externos"}`;
        }
      } catch (err) {
        estadoAutorespuesta = `error: ${err.message}`;
      }

      // Respuesta JSON hacia el frontend de React
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
            "Access-Control-Allow-Origin": "*",
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
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};

