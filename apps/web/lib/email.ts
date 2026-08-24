import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Dominio de pruebas de Resend: solo entrega a la dirección con la que te
// registraste en Resend, no a usuarios reales. Cuando haya un dominio propio
// verificado, este remitente es lo único que hay que cambiar.
const REMITENTE = "Kovli <onboarding@resend.dev>";

export async function enviarDigest(destinatario: string, asunto: string, texto: string) {
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
