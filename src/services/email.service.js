import { createTransport } from "nodemailer";
import { env } from "../config/env.config.js";

const transporterGmail = createTransport({
  service: env.email.service,
  port: env.email.port,
  secure: true,
  auth: {
    user: env.email.user,
    pass: env.email.password
  }
});

export const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: `"E-commerce" <${env.email.user}>`,
      to: user.email,
      subject: '¡Bienvenido a nuestra tienda!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">¡Hola ${user.first_name}!</h1>
          <p style="font-size: 16px; color: #666;">
            Gracias por registrarte en nuestra tienda.
          </p>
          <p style="font-size: 16px; color: #666;">
            Tu cuenta ha sido creada exitosamente con el email: <strong>${user.email}</strong>
          </p>
          <p style="font-size: 16px; color: #666;">
            Ya puedes comenzar a explorar nuestros productos y realizar tus compras.
          </p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 14px; color: #999;">
            Si no solicitaste este registro, puedes ignorar este mensaje.
          </p>
        </div>
      `
    };

    const info = await transporterGmail.sendMail(mailOptions);
    console.log('✅ Email de bienvenida enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error al enviar email de bienvenida:', error.message);
    throw new Error('Error al enviar email de bienvenida');
  }
};

export const sendPurchaseTicket = async (user, ticket) => {
  try {
    const productRows = ticket.products.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.subtotal.toFixed(2)}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"E-commerce" <${env.email.user}>`,
      to: user.email,
      subject: `Confirmación de compra - Ticket ${ticket.code}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">¡Gracias por tu compra, ${user.first_name}!</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #666; margin: 0 0 10px 0;">Detalles del pedido</h2>
            <p style="margin: 5px 0;"><strong>Código de ticket:</strong> ${ticket.code}</p>
            <p style="margin: 5px 0;"><strong>Fecha:</strong> ${new Date(ticket.purchase_datetime).toLocaleString('es-AR')}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${ticket.purchaser}</p>
          </div>

          <h3 style="color: #333;">Productos adquiridos:</h3>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 10px; text-align: left;">Producto</th>
                <th style="padding: 10px; text-align: center;">Cantidad</th>
                <th style="padding: 10px; text-align: right;">Precio Unit.</th>
                <th style="padding: 10px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${productRows}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 20px;">
            <h2 style="color: #333; margin: 0;">Total: $${ticket.amount.toFixed(2)}</h2>
          </div>

          <hr style="border: 1px solid #eee; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #999;">
            Guarda este email como comprobante de tu compra.
          </p>
        </div>
      `
    };

    const info = await transporterGmail.sendMail(mailOptions);
    console.log('✅ Email de ticket enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error al enviar email de ticket:', error.message);
    throw new Error('Error al enviar email de ticket');
  }
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    const resetUrl = `http://localhost:${env.port}/api/sessions/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"E-commerce" <${env.email.user}>`,
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Recuperación de contraseña</h1>
          
          <p style="font-size: 16px; color: #666;">
            Hola ${user.first_name},
          </p>
          
          <p style="font-size: 16px; color: #666;">
            Recibimos una solicitud para restablecer tu contraseña.
          </p>

          <p style="font-size: 16px; color: #666;">
            Para crear una nueva contraseña, realiza una petición <strong>PUT</strong> al siguiente endpoint con tu nueva contraseña:
          </p>

          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0; font-family: monospace; font-size: 14px; word-break: break-all;">
              <strong>Endpoint:</strong><br>
              PUT ${resetUrl}
            </p>
            <p style="margin: 10px 0 5px 0; font-family: monospace; font-size: 14px;">
              <strong>Body (JSON):</strong>
            </p>
            <pre style="background-color: #282c34; color: #61dafb; padding: 10px; border-radius: 5px; overflow-x: auto;">
{
  "newPassword": "tu_nueva_contraseña"
}</pre>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>⚠️ Importante:</strong> Este enlace expirará en <strong>1 hora</strong>.
            </p>
          </div>

          <p style="font-size: 14px; color: #666;">
            <strong>Token de recuperación:</strong>
          </p>
          <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 12px;">
            ${resetToken}
          </div>

          <hr style="border: 1px solid #eee; margin: 20px 0;">
          
          <p style="font-size: 14px; color: #999;">
            Si no solicitaste restablecer tu contraseña, ignora este mensaje y tu contraseña permanecerá sin cambios.
          </p>
        </div>
      `
    };

    const info = await transporterGmail.sendMail(mailOptions);
    console.log('✅ Email de recuperación enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error al enviar email de recuperación:', error.message);
    throw new Error('Error al enviar email de recuperación');
  }
};