import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email, name, vcardUrl, qrUrl } = await req.json();

        if (!email || !vcardUrl) {
            return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || '"RegistraYa VCards" <noreply@registraya.com>',
            to: email,
            subject: '¡Tu Contacto Digital está Listo! 🚀',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #4F46E5;">¡Hola ${name}!</h1>
                    <p>Tu Contacto Digital profesional ha sido aprobado y generado exitosamente.</p>
                    <p>Adjunto encontrarás tu código QR para compartir.</p>
                    <br/>
                    <a href="${vcardUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Descargar Contacto (.vcf)</a>
                    <br/><br/>
                    <p>O mira tu perfil online aquí: <a href="${vcardUrl.replace('/api/vcard', '/card').replace('.vcf', '')}">Ver Perfil Online</a></p>
                    <hr/>
                    <p style="font-size: 12px; color: #888;">TE RECORDAMOS. Al recibir este correo, has sido suscrito a nuestro boletín de noticias exclusivo para profesionales, donde compartiremos tips de networking y tecnología. Si deseas desuscribirte, responde a este correo.</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'qr-code.png',
                    path: qrUrl
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
