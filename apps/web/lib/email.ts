import { Resend } from "resend";

// Dominio de pruebas de Resend: solo entrega a la dirección con la que te
// registraste en Resend, no a usuarios reales. Cuando haya un dominio propio
// verificado, este remitente es lo único que hay que cambiar.
const REMITENTE = "Kovli <onboarding@resend.dev>";

export async function enviarDigest(destinatario: string, asunto: string, texto: string) {
  // El cliente se crea aquí, no al cargar el módulo: si se creara arriba con
  // "new Resend(...)", Next.js lo ejecutaría también al recopilar datos de
  // cada página durante `next build` (import estático), y ahí no siempre
  // están disponibles las variables de entorno — Resend valida la clave de
  // forma síncrona en el constructor y rompería el build entero por un
  // problema que solo debería afectar al envío real de un email.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: REMITENTE,
    to: [destinatario],
    subject: asunto,
    text: texto,
  });

  if (error) {
    throw new Error(`No se pudo enviar el email a ${destinatario}: ${error.message}`);
  }
}
